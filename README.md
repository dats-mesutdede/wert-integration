# Wert Integration Sample

This project demonstrates the integration of Wert's payment widget for NFT purchases using Next.js and TypeScript.

## Features

- NFT purchase integration with Wert payment widget
- Secure payment processing
- Dark theme support
- Responsive design
- TypeScript support

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Wert partner account

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd wert-samples
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Wert partner ID:
```env
NEXT_PUBLIC_WERT_PARTNER_ID=your_partner_id
```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── nft/
│   │   │   └── page.tsx    # NFT purchase page
│   │   └── page.tsx        # Main page
│   └── components/         # Reusable components
├── public/                 # Static files
└── package.json           # Project dependencies
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Wert Widget](https://docs.wert.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## Configuration

The NFT purchase page uses the following configuration:

- Network: Amoy testnet
- Theme: Dark
- Commodity: TT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support with Wert integration, please refer to the [Wert Documentation](https://docs.wert.io/). 