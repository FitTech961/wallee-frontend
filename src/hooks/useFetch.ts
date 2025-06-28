import { useState, useEffect } from 'react';
import { request } from '../api';

/**
 * State returned by useFetch.
 *
 * @property data    Parsed JSON data of type T, or null while loading/error.
 * @property loading True while the request is in flight.
 * @property error   The Error object if fetch or parse failed, otherwise null.
 */
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Generic hook to fetch JSON from a URL.
 *
 * @param url — endpoint or local file path
 * @returns   { data, loading, error } matching FetchState<T>
 */
export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Cleanup flag to prevent setting state after unmount
    let cancelled = false;

    async function fetch() {
      try {
        const response = await request.get<T>(url);
        const json = response.data;
        if (!cancelled) {
          setState({ data: json, loading: false, error: null });
        }
      } catch (err: any) {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err });
        }
      }
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
