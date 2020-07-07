export const UNKNOWN = 'UNKNOWN'
export const INVALID_INPUT = 'INVALID_INPUT'
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN'
export const PAYMENT_ERROR = 'PAYMENT_ERROR'
export const PADDLE_ERROR = 'PADDLE_ERROR'
export const SENDGRID_ERROR = 'SENDGRID_ERROR'

export const messages = {
  [UNKNOWN]: 'There was an unexpected error',
  [INVALID_INPUT]: 'Invalid input',
  [NOT_LOGGED_IN]: 'You must be logged in',
  [PAYMENT_ERROR]: 'There was a payment processing error',
  [PADDLE_ERROR]: 'There was an error with the Paddle integration',
  [SENDGRID_ERROR]: 'There was an error with the SendGrid integration',
}
