import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="not-found">
            <div>
                <span className="eyebrow">Page not found</span>
                <h1 className="display not-found__code grad">404</h1>
                <p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
                <Link href="/" className="btn btn--primary">
                    <ArrowLeft size={16} /> Back to portfolio
                </Link>
            </div>
        </main>
    );
}
