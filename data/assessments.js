export const generateAssessments = () => {
  const categories = [
    'Programming', 'Marketing', 'Design', 'Finance', 'Business', 'Sales', 'Customer Service', 'Analytics', 'Human Resources',
    'Healthcare', 'Education', 'Law', 'Science', 'Engineering', 'Architecture', 'Psychology', 'Sociology', 'Philosophy',
    'History', 'Geography', 'Literature', 'Art', 'Music', 'Theater', 'Film', 'Photography', 'Journalism', 'Communications',
    'Public Relations', 'Advertising', 'Social Media', 'Content Writing', 'Technical Writing', 'Creative Writing', 'Translation',
    'Linguistics', 'Anthropology', 'Political Science', 'Economics', 'Statistics', 'Mathematics', 'Physics', 'Chemistry',
    'Biology', 'Environmental Science', 'Geology', 'Astronomy', 'Computer Science', 'Information Technology', 'Cybersecurity',
    'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Robotics', 'Electronics', 'Mechanical Engineering',
    'Civil Engineering', 'Chemical Engineering', 'Electrical Engineering', 'Software Engineering', 'Industrial Engineering',
    'Aerospace Engineering', 'Biomedical Engineering', 'Environmental Engineering', 'Materials Science', 'Nanotechnology',
    'Biotechnology', 'Genetics', 'Microbiology', 'Pharmacology', 'Nursing', 'Medicine', 'Dentistry', 'Veterinary',
    'Physical Therapy', 'Occupational Therapy', 'Nutrition', 'Public Health', 'Mental Health', 'Social Work',
    'Criminal Justice', 'Forensics', 'Emergency Management', 'Fire Safety', 'Security', 'Military', 'Aviation',
    'Maritime', 'Transportation', 'Logistics', 'Supply Chain', 'Operations', 'Quality Assurance', 'Manufacturing',
    'Construction', 'Real Estate', 'Insurance', 'Banking', 'Investment', 'Accounting', 'Auditing', 'Taxation',
    'Consulting', 'Entrepreneurship', 'Innovation', 'Leadership', 'Management', 'Strategy', 'Change Management',
    'Risk Management', 'Compliance', 'Legal Studies', 'Paralegal', 'Court Reporting', 'Mediation', 'Arbitration',
    'International Law', 'Corporate Law', 'Criminal Law', 'Family Law', 'Immigration Law', 'Intellectual Property',
    'Environmental Law', 'Labor Law', 'Tax Law', 'Constitutional Law', 'Contract Law', 'Tort Law', 'Property Law',
    'Administrative Law', 'Maritime Law', 'Aviation Law', 'Sports Law', 'Entertainment Law', 'Health Law',
    'Education Administration', 'Curriculum Development', 'Instructional Design', 'Educational Technology', 'Special Education',
    'Early Childhood Education', 'Elementary Education', 'Secondary Education', 'Higher Education', 'Adult Education',
    'Vocational Training', 'Corporate Training', 'E-Learning', 'Distance Learning', 'Library Science', 'Information Science',
    'Museum Studies', 'Archival Science', 'Records Management', 'Knowledge Management', 'Research Methods', 'Data Analysis',
    'Survey Research', 'Market Research', 'User Research', 'UX Research', 'Product Management', 'Project Management',
    'Program Management', 'Portfolio Management', 'Agile', 'Scrum', 'Lean', 'Six Sigma', 'ITIL', 'DevOps',
    'Cloud Computing', 'Network Administration', 'Database Administration', 'System Administration', 'Web Development',
    'Mobile Development', 'Game Development', 'Software Testing', 'Quality Control', 'Technical Support',
    'Customer Support', 'Help Desk', 'Field Service', 'Maintenance', 'Repair', 'Installation', 'Troubleshooting',
    'Procurement', 'Vendor Management', 'Contract Management', 'Facilities Management', 'Property Management',
    'Event Planning', 'Hospitality', 'Tourism', 'Recreation', 'Sports Management', 'Fitness', 'Wellness',
    'Spa Services', 'Beauty', 'Fashion', 'Retail', 'E-commerce', 'Merchandising', 'Visual Merchandising',
    'Store Management', 'Inventory Management', 'Warehouse Management', 'Distribution', 'Shipping', 'Receiving',
    'Food Service', 'Culinary Arts', 'Baking', 'Pastry', 'Beverage', 'Wine', 'Bartending', 'Restaurant Management',
    'Catering', 'Food Safety', 'Agriculture', 'Horticulture', 'Forestry', 'Fishing', 'Mining', 'Oil & Gas',
    'Renewable Energy', 'Solar Energy', 'Wind Energy', 'Hydroelectric', 'Nuclear Energy', 'Energy Management',
    'Sustainability', 'Green Building', 'LEED', 'Environmental Compliance', 'Waste Management', 'Water Treatment',
    'Air Quality', 'Climate Change', 'Conservation', 'Wildlife Management', 'Marine Biology', 'Ecology'
  ]

  const levels = ['Beginner', 'Intermediate', 'Advanced']
  const assessments = []

  categories.forEach((category, index) => {
    const level = levels[index % 3]
    assessments.push({
      id: (index + 1).toString(),
      title: `${category} Assessment`,
      description: `Test your knowledge and skills in ${category.toLowerCase()}`,
      duration: 30,
      category: category,
      level: level,
      questions: []
    })
  })

  return assessments
}

export const allAssessments = generateAssessments()