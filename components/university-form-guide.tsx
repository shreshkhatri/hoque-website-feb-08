/**
 * UNIVERSITY FORM DATA GUIDE
 * 
 * This file provides format examples for entering highlights, required_documents, and faqs
 * in the university form. Use these as reference when adding data to the database.
 * 
 * All three fields should be entered as JSON arrays.
 */

// ==================== HIGHLIGHTS FORMAT ====================
// Enter as a JSON array of objects. Each highlight should have:
// - icon: Name of the icon (Award, Briefcase, Users, Globe, Star, GraduationCap, Building2, BookOpen)
// - title: Short title for the highlight
// - description: Brief description

const HIGHLIGHTS_EXAMPLE = `[
  {
    "icon": "Award",
    "title": "Top Ranked",
    "description": "Among the top universities in the UK for student satisfaction"
  },
  {
    "icon": "Briefcase",
    "title": "Career Support",
    "description": "95% of graduates employed within 6 months"
  },
  {
    "icon": "Users",
    "title": "Diverse Community",
    "description": "Students from over 130 countries"
  },
  {
    "icon": "Globe",
    "title": "Global Connections",
    "description": "Partnerships with 200+ universities worldwide"
  }
]`

// ==================== REQUIRED DOCUMENTS FORMAT ====================
// Enter as a JSON array of objects. Each document should have:
// - name: Document name
// - description: What is required for this document

const REQUIRED_DOCUMENTS_EXAMPLE = `[
  {
    "name": "Academic Transcripts",
    "description": "Official transcripts from all previously attended institutions"
  },
  {
    "name": "English Language Proficiency",
    "description": "IELTS 6.0 overall (min 5.5 in each band) or equivalent"
  },
  {
    "name": "Personal Statement",
    "description": "A statement explaining your motivation and goals"
  },
  {
    "name": "Passport Copy",
    "description": "Valid passport with at least 6 months validity"
  },
  {
    "name": "Reference Letters",
    "description": "Two academic or professional references"
  },
  {
    "name": "CV/Resume",
    "description": "Updated curriculum vitae highlighting relevant experience"
  }
]`

// ==================== FAQS FORMAT ====================
// Enter as a JSON array of objects. Each FAQ should have:
// - question: The question
// - answer: The answer

const FAQS_EXAMPLE = `[
  {
    "question": "What are the entry requirements?",
    "answer": "Entry requirements vary by program. Generally, you need relevant academic qualifications and English language proficiency (IELTS 6.0 or equivalent)."
  },
  {
    "question": "When are the application deadlines?",
    "answer": "Most programs have multiple intakes throughout the year. We recommend applying at least 3-4 months before your intended start date."
  },
  {
    "question": "Is there scholarship available?",
    "answer": "Yes, the university offers various scholarships for international students based on academic merit and financial need."
  },
  {
    "question": "What is the average processing time?",
    "answer": "Application processing typically takes 2-4 weeks. Visa processing time varies by country."
  },
  {
    "question": "Can I work while studying?",
    "answer": "International students can work up to 20 hours per week during term time and full-time during holidays."
  }
]`

/**
 * HOW TO USE IN YOUR FORM:
 * 
 * 1. For highlights field: Copy the HIGHLIGHTS_EXAMPLE above (without the backticks)
 * 2. For required_documents field: Copy the REQUIRED_DOCUMENTS_EXAMPLE above (without the backticks)
 * 3. For faqs field: Copy the FAQS_EXAMPLE above (without the backticks)
 * 
 * Make sure the JSON is valid - you can validate it at jsonlint.com
 * 
 * When inserting into the database, these fields will be stored as JSONB.
 */

export const FORM_HELP_TEXT = {
  highlights: "Enter as JSON array. Available icons: Award, Briefcase, Users, Globe, Star, GraduationCap, Building2, BookOpen",
  required_documents: "Enter as JSON array. Each document needs 'name' and 'description' fields",
  faqs: "Enter as JSON array. Each FAQ needs 'question' and 'answer' fields"
}
