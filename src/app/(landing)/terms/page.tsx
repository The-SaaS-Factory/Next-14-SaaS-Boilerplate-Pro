import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p className="mb-4">Etiam porta sem malesuada magna mollis euismod. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Sed turpis tincidunt id aliquet risus feugiat in ante.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p className="mb-4">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Privacy Policy</h2>
        <p className="mb-4">Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property Rights</h2>
        <p className="mb-4">Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
        <p className="mb-4">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p className="mb-4">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
        <p className="mb-4">Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
        <p className="mb-4">Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      </section>
      
      <footer className="mt-12 text-sm text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>If you have any questions about these Terms, please contact us at <Link href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</Link>.</p>
      </footer>
    </div>
  )
}