import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container mx-auto flex justify-center">
        <p className="text-center text-sm text-muted-foreground">
          Made with ❤ by{" "}
          <Link
            href="https://www.danish-siddiqui.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Danish Siddiqui
          </Link>
        </p>
      </div>
    </footer>
  );
}
