"""Data loader for educational standards from Excel files."""

import openpyxl
from typing import Dict, List
from pathlib import Path
from src.models.standards import Subject, Strand, StrandPart, GradeStandards


class StandardsLoader:
    """Loads and processes educational standards from Excel files."""

    def __init__(self, data_dir: str = "extracted_data"):
        """Initialize the standards loader.

        Args:
            data_dir: Directory containing extracted Excel files
        """
        self.data_dir = Path(data_dir)
        self.standards_cache: Dict[str, List[GradeStandards]] = {}

    def load_subject_standards(self, subject: Subject) -> List[GradeStandards]:
        """Load all standards for a given subject.

        Args:
            subject: Subject to load standards for

        Returns:
            List of GradeStandards for all grades in the subject
        """
        cache_key = subject.value
        if cache_key in self.standards_cache:
            return self.standards_cache[cache_key]

        file_mapping = {
            Subject.ELA: "Centric ELA Strands-2.xlsx",
            Subject.MATH: "Centric Math Strands-2.xlsx",
            Subject.SCIENCE: "Centric Science Strands-2.xlsx",
            Subject.SOCIAL_STUDIES: "Centric Social Studies Strands-3.xlsx"
        }

        file_path = self.data_dir / file_mapping[subject]
        if not file_path.exists():
            raise FileNotFoundError(f"Standards file not found: {file_path}")

        wb = openpyxl.load_workbook(file_path)
        all_grades = []

        for sheet_name in wb.sheetnames:
            grade_standards = self._parse_sheet(wb[sheet_name], subject)
            if grade_standards:
                all_grades.append(grade_standards)

        self.standards_cache[cache_key] = all_grades
        return all_grades

    def _parse_sheet(self, worksheet, subject: Subject) -> GradeStandards:
        """Parse a single worksheet into GradeStandards.

        Args:
            worksheet: Excel worksheet to parse
            subject: Subject of the standards

        Returns:
            GradeStandards object or None if sheet should be skipped
        """
        # Extract grade from sheet name
        sheet_name = worksheet.title
        grade = None

        # Skip overview/info sheets
        skip_sheets = ["overview", "grade level timeline"]
        if sheet_name.lower() in skip_sheets:
            return None

        # Try different naming patterns
        try:
            # Pattern 1: "ELA 06", "Science 06" -> 6
            if sheet_name.split()[-1].isdigit():
                grade = int(sheet_name.split()[-1])

            # Pattern 2: "Grade 6 - World Geography" -> 6
            elif "grade" in sheet_name.lower():
                parts = sheet_name.lower().split("grade")
                if len(parts) > 1:
                    num_str = parts[1].strip().split()[0]
                    if num_str.isdigit():
                        grade = int(num_str)

            # Pattern 3: High school courses map to grade 9-12
            # For Science: Biology=9, Chemistry=10, Physics=11, etc.
            # For Social Studies: use sheet order
            elif subject == Subject.SCIENCE:
                high_school_courses = {
                    "biology": 9,
                    "chemistry": 10,
                    "earth & space science": 11,
                    "physics": 11,
                    "anatomy and physiology": 12
                }
                grade = high_school_courses.get(sheet_name.lower())

            elif subject == Subject.SOCIAL_STUDIES:
                high_school_courses = {
                    "u.s. history & geography": 9,
                    "world history & geography": 10,
                    "civics": 11,
                    "economics": 12
                }
                grade = high_school_courses.get(sheet_name.lower())

            # Pattern 4: Math courses
            elif subject == Subject.MATH:
                math_courses = {
                    "algebra readiness": 8,
                    "algebra 1": 9,
                    "geometry": 10,
                    "algebra 2": 11,
                    "precalculus": 12
                }
                grade = math_courses.get(sheet_name.lower())

        except (ValueError, IndexError):
            pass

        # If we couldn't determine a grade, skip this sheet
        if grade is None:
            return None

        strands: Dict[str, Strand] = {}
        current_strand_title = None

        # Skip header row
        rows = list(worksheet.iter_rows(values_only=True))
        for row in rows[1:]:
            if not row or len(row) < 2 or not row[1]:  # Skip empty or malformed rows
                continue

            # Safely extract values with bounds checking
            # Convert None to empty string for all fields
            strand_title = row[0] if len(row) > 0 else None
            strand_code = row[1] if len(row) > 1 else None
            prof_1 = str(row[2] or "") if len(row) > 2 else ""
            prof_2 = str(row[3] or "") if len(row) > 3 else ""
            prof_3 = str(row[4] or "") if len(row) > 4 else ""
            cc_alignment = str(row[5] or "") if len(row) > 5 else ""

            # Update current strand title
            if strand_title:
                current_strand_title = strand_title
                if current_strand_title not in strands:
                    strands[current_strand_title] = Strand(
                        title=current_strand_title,
                        parts=[]
                    )

            # Add strand part
            if current_strand_title and strand_code:
                strand_part = StrandPart(
                    code=strand_code,
                    proficiency_level_1=prof_1,
                    proficiency_level_2=prof_2,
                    proficiency_level_3=prof_3,
                    common_core_alignment=cc_alignment
                )
                strands[current_strand_title].parts.append(strand_part)

        return GradeStandards(
            subject=subject,
            grade=grade,
            strands=list(strands.values())
        )

    def get_strand_by_code(self, code: str) -> tuple[StrandPart, GradeStandards]:
        """Find a specific strand part by its code.

        Args:
            code: Strand part code (e.g., "ELA06.RLa", "SCI06.SPMa", "SS06.DQa")

        Returns:
            Tuple of (StrandPart, GradeStandards) or (None, None) if not found
        """
        # Extract subject from code prefix
        code_upper = code.upper()

        # Determine subject based on prefix
        subject = None
        if code_upper.startswith("ELA"):
            subject = Subject.ELA
        elif code_upper.startswith("MAT") or code_upper.startswith("MATH"):
            subject = Subject.MATH
        elif code_upper.startswith("SCI"):
            subject = Subject.SCIENCE
        elif code_upper.startswith("SS") or code_upper.startswith("SOC"):
            subject = Subject.SOCIAL_STUDIES

        if not subject:
            return None, None

        all_standards = self.load_subject_standards(subject)

        for grade_standards in all_standards:
            for strand in grade_standards.strands:
                for part in strand.parts:
                    if part.code == code:
                        return part, grade_standards

        return None, None

    def search_standards(self, query: str, subject: Subject = None, grade: int = None) -> List[tuple[StrandPart, str, Subject, int]]:
        """Search standards by keyword.

        Args:
            query: Search query
            subject: Optional subject filter
            grade: Optional grade filter

        Returns:
            List of tuples (StrandPart, strand_title, subject, grade)
        """
        results = []
        query_lower = query.lower()

        subjects_to_search = [subject] if subject else list(Subject)

        for subj in subjects_to_search:
            all_standards = self.load_subject_standards(subj)

            for grade_standards in all_standards:
                if grade and grade_standards.grade != grade:
                    continue

                for strand in grade_standards.strands:
                    for part in strand.parts:
                        # Search in all text fields
                        searchable_text = " ".join([
                            strand.title,
                            part.code,
                            part.proficiency_level_1,
                            part.proficiency_level_2,
                            part.proficiency_level_3,
                            part.common_core_alignment
                        ]).lower()

                        if query_lower in searchable_text:
                            results.append((part, strand.title, subj, grade_standards.grade))

        return results
