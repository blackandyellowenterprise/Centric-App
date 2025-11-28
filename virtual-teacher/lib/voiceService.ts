import { VoiceSettings } from '@/types';

export class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private settings: VoiceSettings;

  constructor() {
    this.settings = {
      enabled: true,
      rate: 1.0,
      pitch: 1.0,
    };

    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
      this.loadSettings();
    }
  }

  private loadSettings(): void {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('voice_settings');
    if (stored) {
      try {
        this.settings = JSON.parse(stored);
      } catch {
        // Use defaults
      }
    }
  }

  saveSettings(settings: Partial<VoiceSettings>): void {
    this.settings = { ...this.settings, ...settings };

    if (typeof window !== 'undefined') {
      localStorage.setItem('voice_settings', JSON.stringify(this.settings));
    }
  }

  getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  async speak(text: string, onEnd?: () => void): Promise<void> {
    if (!this.synth || !this.settings.enabled) {
      onEnd?.();
      return;
    }

    return new Promise((resolve) => {
      // Cancel any ongoing speech
      this.synth!.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.settings.rate;
      utterance.pitch = this.settings.pitch;

      if (this.settings.voice) {
        utterance.voice = this.settings.voice;
      } else {
        // Try to find a friendly English voice
        const voices = this.getAvailableVoices();
        const preferredVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha'))
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onend = () => {
        onEnd?.();
        resolve();
      };

      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        onEnd?.();
        resolve();
      };

      this.synth!.speak(utterance);
    });
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  isSpeaking(): boolean {
    return this.synth?.speaking || false;
  }

  pause(): void {
    if (this.synth) {
      this.synth.pause();
    }
  }

  resume(): void {
    if (this.synth) {
      this.synth.resume();
    }
  }
}

// Singleton instance
let voiceService: VoiceService | null = null;

export function getVoiceService(): VoiceService {
  if (!voiceService) {
    voiceService = new VoiceService();
  }
  return voiceService;
}
