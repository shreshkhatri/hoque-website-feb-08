import bcrypt from 'bcryptjs'

// Generate a proper bcrypt hash for the default admin password
const password = 'Admin@1234'
const hash = await bcrypt.hash(password, 12)

console.log('Admin Password Hash:')
console.log(hash)
console.log('')
console.log('Use the /api/admin/setup endpoint to create the admin:')
console.log(`POST /api/admin/setup`)
console.log(JSON.stringify({
  email: 'admin@hoque.org.uk',
  password: 'Admin@1234',
  name: 'Admin',
  setupKey: 'hoque-setup-2026'
}, null, 2))
