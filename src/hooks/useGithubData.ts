import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

export interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
  updatedAt?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Vue: '#41b883',
};

export function useGithubData(username: string = 'surajpillai11') {
  const [repos, setRepos] = useState<GithubRepo[]>(portfolioData.github.fallbackRepos);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRepos() {
      try {
        setIsLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
          {
            signal: controller.signal,
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`GitHub API returned status ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0 && isMounted) {
          const mappedRepos: GithubRepo[] = data.map((item: any) => ({
            name: item.name,
            description: item.description || 'Public repository by Suraj Pillai.',
            language: item.language || 'Code',
            languageColor: (item.language && LANGUAGE_COLORS[item.language]) || '#38bdf8',
            stars: item.stargazers_count || 0,
            forks: item.forks_count || 0,
            url: item.html_url,
            updatedAt: item.updated_at,
          }));
          setRepos(mappedRepos);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Using offline portfolio repository cache');
          // Gracefully fallback to curated projects
          setRepos(portfolioData.github.fallbackRepos);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { repos, isLoading, error };
}
