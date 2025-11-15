# Contributing to Centric Learning Claude Agent

Thank you for your interest in contributing to the Centric Learning Claude Agent! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Set up your development environment (see below)

## Development Environment Setup

### Prerequisites
- Python 3.11 or higher
- pip or conda
- Git

### Installation

```bash
# Install dependencies
pip install -r requirements.txt

# Extract test data
unzip "Centric Courses Strand.zip" -d extracted_data

# Copy environment template
cp .env.example .env

# Edit .env and add your ANTHROPIC_API_KEY
```

## Development Workflow

### Making Changes

1. Write your code following the project style
2. Add tests for new functionality
3. Update documentation as needed
4. Run tests to ensure everything works
5. Commit your changes with clear messages

### Code Style

- Follow PEP 8 guidelines
- Use type hints where appropriate
- Write docstrings for all functions and classes
- Keep functions focused and concise

Example:
```python
def calculate_score(value: int, max_value: int) -> float:
    """Calculate a normalized score.

    Args:
        value: Current value
        max_value: Maximum possible value

    Returns:
        Normalized score between 0.0 and 1.0
    """
    return value / max_value
```

### Testing

Run tests before submitting:
```bash
pytest tests/ -v
```

Add tests for new features:
```python
def test_new_feature():
    """Test description."""
    # Arrange
    # Act
    # Assert
```

### Commit Messages

Follow this format:
```
<type>: <short description>

<detailed description if needed>

<issue reference if applicable>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Maintenance tasks

Example:
```
feat: Add multi-grade lesson plan generation

Implement functionality to generate lesson plans spanning multiple
grade levels for differentiated instruction.

Closes #42
```

## Pull Request Process

1. Update the README.md with details of significant changes
2. Update the version numbers following SemVer
3. Ensure all tests pass
4. Request review from maintainers
5. Address any feedback

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How the changes were tested

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
```

## Areas for Contribution

### High Priority
- Web-based frontend interface
- Additional subject support
- Performance optimizations
- Test coverage improvements

### Features
- User authentication system
- Response caching
- Export functionality
- Student progress tracking

### Documentation
- API usage examples
- Educational use cases
- Video tutorials
- Translation to other languages

## Questions or Issues?

- Check existing issues
- Open a new issue with:
  - Clear description
  - Steps to reproduce (for bugs)
  - Expected vs actual behavior
  - Environment details

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Be patient with new contributors

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

Thank you for contributing to Centric Learning!
