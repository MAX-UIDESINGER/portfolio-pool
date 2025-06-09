import Hero from "@/components/Hero";

async function getRepos() {
  const res = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token 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`,
    },
    cache: "no-store",
  });

  const allRepos = await res.json();

  if (!Array.isArray(allRepos)) {
    throw new Error(`GitHub API error: ${JSON.stringify(allRepos)}`);
  }

  const repoImages: Record<string, string> = {
    "bi-infomatica_v1.0.0": "/images/Bi_INFOMATICA.webp",
    "Caja-web": "/images/CARTA_DIGITAL.webp",
    "Carta-Gourmet": "/images/CARTA_GOURMET.webp",
    "Colpex2.0App_FireBase": "/images/COLPEX_APP.webp",
    "SistemaInventario2023_UEHOSPSUPE": "/images/HOSPISUPE.webp",
  };

  // Repos de GitHub
  const githubRepos = allRepos
    .filter((repo: any) => repo.owner.login === 'MAX-UIDESINGER' && !repo.fork)
    .map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      image: repoImages[repo.name] || '/images/NO_FOTO.webp', // Usa la imagen personalizada o una por defecto
      language: repo.language || 'Desconocido',
      homepage: repo.homepage,
      topics: repo.topics,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      isPrivate: repo.private,
      productionUrl: undefined, // Puedes mapearlo si tienes un campo específico
    }));

  // Proyectos personalizados
  const customRepos = [
    {
      id: 826752137,
      name: 'Qiosco',
      description: 'Plataforma de pagos multi-método con React/Material-UI. Acepta American Express, Mastercard, Izipay y Niubiz para consulta de precios y transacciones.',
      url: 'https://qiosco.infomatica.pe/',
      image: '/images/QIOSCO.webp',
      language: 'TypeScript',
      homepage: '',
      topics: [],
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '',
      isPrivate: false,
      productionUrl: 'https://qiosco.infomatica.pe/',
    },
    {
      id: 826752138,
      name: 'web INFOmatica',
      description: 'Tienda hecha con React y Stripe.',
      url: 'https://www.test.infomatica.pe/',
      image: '/images/WEB_INFOMATICA.webp',
      language: 'TypeScript',
      homepage: '',
      topics: [],
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '',
      isPrivate: false,
      productionUrl: 'https://www.test.infomatica.pe/',
    },
     {
      id: 826752139,
      name: 'INFOback web',
     description: 'Aplicación web para administración de inventarios, seguimiento de productos y gestión logística. Desarrollada con React y procesamiento de pagos via Stripe.',
      url: 'https://infoback.pe/',
      image: '/images/INFOBACK.webp',
      language: 'TypeScript',
      homepage: '',
      topics: [],
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '',
      isPrivate: false,
      productionUrl: 'https://infoback.pe/',
    },
  ];

  // Combina ambos arrays
  return [...githubRepos, ...customRepos];
}

export default async function Home() {
  const repos = await getRepos();

  return (
    <main className="overflow-hidden">
      <Hero repos={repos} />
    </main>
  );
}
