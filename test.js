import { EventEmitter } from 'node:events'

const customerDetails = {
  fullName: 'Meryl Sheep',
  email: 'baah@thedevilwearswool.com',
  phone: 12345678910
}

// create the emitter
const emailRequestEmitter = new EventEmitter()

// define the listener function
function generateEmail(customer) {
  console.log(`Email generated for ${customer.email}`)
}

// register the listener to receive the event by its name
// the data is passed to the function

emailRequestEmitter.on('emailRequest', () => console.log('email logged'))


// emit the event with data, event name can be any string

emailRequestEmitter.emit('emailRequest')