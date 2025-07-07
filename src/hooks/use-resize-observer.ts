import { useLayoutEffect, RefObject } from 'react';

export const useResizeObserver = (
	ref: RefObject<HTMLElement>,
	callback: (entry: ResizeObserverEntry) => void
) => {
	useLayoutEffect(() => {
		const element = ref?.current;
		if (!element) return;

		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (entry) {
				callback(entry);
			}
		});

		observer.observe(element);
		return () => observer.disconnect();
	}, [ref, callback]);
};