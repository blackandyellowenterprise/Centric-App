"""Tests for the standards loader."""

import pytest
from src.data_processing.loader import StandardsLoader
from src.models.standards import Subject


def test_loader_initialization():
    """Test that the loader initializes correctly."""
    loader = StandardsLoader()
    assert loader.data_dir.name == "extracted_data"
    assert loader.standards_cache == {}


def test_load_ela_standards():
    """Test loading ELA standards."""
    loader = StandardsLoader()
    standards = loader.load_subject_standards(Subject.ELA)

    assert len(standards) > 0
    assert all(s.subject == Subject.ELA for s in standards)
    assert all(isinstance(s.grade, int) for s in standards)


def test_get_strand_by_code():
    """Test retrieving a specific strand by code."""
    loader = StandardsLoader()
    strand_part, grade_standards = loader.get_strand_by_code("ELA06.RLa")

    assert strand_part is not None
    assert grade_standards is not None
    assert strand_part.code == "ELA06.RLa"
    assert grade_standards.grade == 6
    assert grade_standards.subject == Subject.ELA


def test_search_standards():
    """Test searching standards."""
    loader = StandardsLoader()
    results = loader.search_standards("reading literature", Subject.ELA)

    assert len(results) > 0
    assert all(isinstance(r, tuple) for r in results)


def test_invalid_strand_code():
    """Test handling of invalid strand code."""
    loader = StandardsLoader()
    strand_part, grade_standards = loader.get_strand_by_code("INVALID.CODE")

    assert strand_part is None
    assert grade_standards is None


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
