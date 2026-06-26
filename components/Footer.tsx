type FooterProps = {
  labels: {
    name: string;
    tagline: string;
    email: string;
    github: string;
    cv: string;
  };
};

export function Footer({ labels }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-600 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">{labels.name}</p>
          <p className="mt-1">{labels.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a className="transition hover:text-slate-950 dark:hover:text-white" href="mailto:juan.jose120@hotmail.com">
            {labels.email}
          </a>
          <a
            className="transition hover:text-slate-950 dark:hover:text-white"
            href="https://github.com/Juanjho120"
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.github}
          </a>
          <a className="transition hover:text-slate-950 dark:hover:text-white" href="/cv/Juan_Tzun_CV.pdf">
            {labels.cv}
          </a>
        </div>

        <p className="text-slate-500 dark:text-slate-400">© {currentYear} juantzun.dev</p>
      </div>
    </footer>
  );
}
