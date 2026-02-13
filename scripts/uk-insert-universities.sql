-- Insert 23 new partner universities for UK (country_id=1)
-- Existing: 75 Queen's University Belfast, 76 Northumbria University, 77 University of Greenwich, 78 Middlesex University, 79 London South Bank University

INSERT INTO universities (name, city, country_id, description, website_url) VALUES
('University of East London', 'London', 1, 'The University of East London (UEL) is a public university in London, known for its career-focused programmes and diverse student community.', 'https://www.uel.ac.uk'),
('University of Hertfordshire', 'Hatfield', 1, 'The University of Hertfordshire is a public university based in Hatfield, known for its strong industry links and innovative teaching.', 'https://www.herts.ac.uk'),
('University of Roehampton', 'London', 1, 'The University of Roehampton is a public university in south-west London, known for its beautiful campus and strong humanities and social sciences programmes.', 'https://www.roehampton.ac.uk'),
('University of Bedfordshire', 'Luton', 1, 'The University of Bedfordshire is a public university with campuses in Luton and Bedford, offering a wide range of career-focused programmes.', 'https://www.beds.ac.uk'),
('University of Sunderland', 'Sunderland', 1, 'The University of Sunderland is a public university in North East England, known for its focus on employability and student support.', 'https://www.sunderland.ac.uk'),
('Birmingham City University', 'Birmingham', 1, 'Birmingham City University is a large public university in the heart of Birmingham, known for its practice-based and career-focused education.', 'https://www.bcu.ac.uk'),
('Coventry University', 'Coventry', 1, 'Coventry University is a public research university known for its innovative approach to teaching and strong employability record.', 'https://www.coventry.ac.uk'),
('University of West London', 'London', 1, 'The University of West London is a public university known for its career-focused courses and strong links to industry.', 'https://www.uwl.ac.uk'),
('Canterbury Christ Church University', 'Canterbury', 1, 'Canterbury Christ Church University is a public university in Canterbury, Kent, with a strong reputation in education, health, and the arts.', 'https://www.canterbury.ac.uk'),
('University of Chester', 'Chester', 1, 'The University of Chester is one of England oldest higher education institutions, offering a wide range of undergraduate and postgraduate programmes.', 'https://www.chester.ac.uk'),
('University of Bradford', 'Bradford', 1, 'The University of Bradford is a public university in West Yorkshire, known for its research excellence and commitment to making knowledge work.', 'https://www.bradford.ac.uk'),
('Teesside University', 'Middlesbrough', 1, 'Teesside University is a public university in Middlesbrough, recognised for its digital innovation, computing, and engineering programmes.', 'https://www.tees.ac.uk'),
('Anglia Ruskin University', 'Cambridge', 1, 'Anglia Ruskin University (ARU) is a public university with campuses in Cambridge and Chelmsford, known for its health, business, and creative programmes.', 'https://www.aru.ac.uk'),
('De Montfort University', 'Leicester', 1, 'De Montfort University (DMU) is a public university in Leicester, known for its creative arts, technology, and business programmes.', 'https://www.dmu.ac.uk'),
('University of Central Lancashire', 'Preston', 1, 'The University of Central Lancashire (UCLan) is a public university in Preston, one of the largest universities in the UK by student population.', 'https://www.uclan.ac.uk'),
('University of Wolverhampton', 'Wolverhampton', 1, 'The University of Wolverhampton is a public university in the West Midlands, known for its professional and vocational courses.', 'https://www.wlv.ac.uk'),
('University of Suffolk', 'Ipswich', 1, 'The University of Suffolk is a public university in Ipswich, focused on transformative education and employability.', 'https://www.uos.ac.uk'),
('Wrexham University', 'Wrexham', 1, 'Wrexham University (formerly Wrexham Glyndwr University) is a public university in Wales, known for its applied and practice-based education.', 'https://www.wrexham.ac.uk'),
('University of Huddersfield', 'Huddersfield', 1, 'The University of Huddersfield is a public university in West Yorkshire, known for its strong focus on employability and industry placements.', 'https://www.hud.ac.uk'),
('Leeds Beckett University', 'Leeds', 1, 'Leeds Beckett University is a public university in Leeds, known for its sport, business, and creative programmes.', 'https://www.leedsbeckett.ac.uk'),
('Sheffield Hallam University', 'Sheffield', 1, 'Sheffield Hallam University is a public university in Sheffield, one of the largest in the UK, known for applied research and professional development.', 'https://www.shu.ac.uk'),
('University of the West of England', 'Bristol', 1, 'The University of the West of England (UWE Bristol) is a public university known for its practice-oriented courses and strong industry connections.', 'https://www.uwe.ac.uk'),
('University of Salford', 'Manchester', 1, 'The University of Salford is a public university in Greater Manchester, known for its industry partnerships and career-focused programmes.', 'https://www.salford.ac.uk');

-- Verify all 28 UK partner universities exist
SELECT id, name, city FROM universities WHERE country_id = 1 ORDER BY name;
