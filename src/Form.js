const SERVERLESS_FN_URL = "https://workers-airtable-form.signalnerve.workers.dev/submit"

export default () => (
  <form action={SERVERLESS_FN_URL} method="POST" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
    <div>
      <label htmlFor="first_name" className="block text-sm font-medium text-warm-gray-900">
        First name
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="first_name"
          id="first_name"
          autoComplete="given-name"
          placeholder="Ellen"
          required
          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
        />
      </div>
    </div>
    <div>
      <label htmlFor="last_name" className="block text-sm font-medium text-warm-gray-900">
        Last name
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="last_name"
          id="last_name"
          autoComplete="family-name"
          placeholder="Ripley"
          required
          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
        />
      </div>
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-warm-gray-900">
        Email
      </label>
      <div className="mt-1">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="eripley@nostromo.com"
          required
          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
        />
      </div>
    </div>
    <div>
      <div className="flex justify-between">
        <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-900">
          Phone
        </label>
        <span id="phone-optional" className="text-sm text-warm-gray-500">
          Optional
        </span>
      </div>
      <div className="mt-1">
        <input
          type="text"
          name="phone"
          id="phone"
          autoComplete="tel"
          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
          placeholder="+1 (123) 456-7890"
          aria-describedby="phone-optional"
        />
      </div>
    </div>
    <div className="sm:col-span-2">
      <label htmlFor="subject" className="block text-sm font-medium text-warm-gray-900">
        Subject
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Your example subject"
          required
          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
        />
      </div>
    </div>
    <div className="sm:col-span-2">
      <div className="flex justify-between">
        <label htmlFor="message" className="block text-sm font-medium text-warm-gray-900">
          Message
        </label>
        <span id="message-max" className="text-sm text-warm-gray-500">
          Max. 500 characters
        </span>
      </div>
      <div className="mt-1">
        <textarea
          id="message"
          name="message"
          rows={4}
          className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
          aria-describedby="message-max"
          placeholder="Tenetur optio quaerat expedita vero et illo. Tenetur nam explicabo dolor voluptatem eveniet. Commodi est beatae id voluptatum porro laudantium. Quam placeat accusamus vel officiis vel. Et perferendis dicta ut perspiciatis quos iste. Tempore autem molestias voluptates in sapiente enim doloremque."
          required
          defaultValue={''}
        />
      </div>
    </div>
    <div className="sm:col-span-2 sm:flex sm:justify-end">
      <button
        type="submit"
        className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:w-auto"
      >
        Submit
      </button>
    </div>
  </form>
)