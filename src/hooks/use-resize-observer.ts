import { RefObject, useLayoutEffect, useState } from "react";

export const useResizeObserver = ({ ref }: {ref: RefObject<HTMLElement>}) => {
	const [width, setWidth] = useState<number>(0);

	useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;
	
		const resizeObserver = new ResizeObserver((entries) => {
		  for (let entry of entries) {
			setWidth(entry.contentRect.width);
		  }
		});
	
		resizeObserver.observe(element);
	
		return () => {
		  resizeObserver.unobserve(element);
		};
	  }, []);

	  return width;
};