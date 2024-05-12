// Not sure how it works exactly, implementation taken from https://www.emgoto.com/react-table-of-contents/
// Review again later

import { useState, useEffect, useRef } from "react";
import { Dispatch, SetStateAction } from "react";

interface HeadingElement {
  id: string;
  isIntersecting: boolean;
  target: {
    id: string;
  };
}

const useIntersectionObserver = (
  setActiveId: Dispatch<SetStateAction<undefined>>
) => {
  const headingElementsRef = useRef<{ [key: string]: HeadingElement }>({});
  useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = headings.reduce(
        (map: any, headingElement: any) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current
      );

      const visibleHeadings: any = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: any) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a: any, b: any) =>
            getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px",
    });

    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const getNestedHeadings = (headingElements: any) => {
  const nestedHeadings: any = [];

  headingElements.forEach((heading: any) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const Headings = ({ headings, activeId }: any) => (
  <ul>
    {headings.map((heading: any) => {
      const pipeIndex = heading.title.indexOf("|");
      const titleToShow =
        pipeIndex !== -1
          ? heading.title.substring(0, pipeIndex).trim()
          : heading.title;
      return (
        <li
          key={heading.id}
          className={`${heading.id === activeId ? "active" : ""} text-start`}
        >
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {titleToShow}
          </a>
          {heading.items.length > 0 && (
            <ul>
              {heading.items.map((child: any) => (
                <li
                  key={child.id}
                  className={child.id === activeId ? "active" : ""}
                >
                  <a
                    href={`#${child.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${child.id}`)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    })}
  </ul>
);

const TableOfContents = () => {
  const { nestedHeadings } = useHeadingsData();
  const [activeId, setActiveId] = useState(undefined);
  useIntersectionObserver(setActiveId);

  return (
    <nav aria-label="Table of contents" className="table-of-contents w-[300px]">
      <Headings headings={nestedHeadings} activeId={activeId} />{" "}
    </nav>
  );
};

export default TableOfContents;
