import styles from "./ProjectItem.module.scss";

import { Project } from "@/types";
import { useEffect, useRef, useState } from "react";

import Image from "@/component/Image";
import Categories from "@/component/Categories";

type ProjectItemProps = {
  index: number;
  project: Project;
};

export default function ProjectItem({
  index,
  project: { slug, title, video, image, categories },
}: ProjectItemProps) {
  const player = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLLIElement>(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    const playerCurrent = player.current!;
    const containerCurrent = container.current!;

    const handleMouseEnter = () => {
      setActive(true);

      playerCurrent.play();
    };

    const handleMouseLeave = () => {
      setActive(false);

      playerCurrent.pause();
      playerCurrent.currentTime = 0;
    };

    containerCurrent.addEventListener("mouseenter", handleMouseEnter);
    containerCurrent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      containerCurrent.removeEventListener("mouseenter", handleMouseEnter);
      containerCurrent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <li
      key={index}
      ref={container}
      className={
        active ? `${styles.item} ${styles["item--active"]}` : `${styles.item}`
      }
    >
      <a href={`/project/${slug}`}>
        <video className={styles.item__video} ref={player} muted autoPlay loop>
          <source src={video} type="video/mp4" />
        </video>

        <Image
          image={image}
          sizes={"(min-width: 768px) 46rem, 80vw"}
          priority={index === 0}
          className={styles.item__image}
        />

        <div className={styles.item__overlay}>
          <h2 className={styles.item__overlay__title}>{title}</h2>
          {categories && (
            <Categories
              className={styles.item__overlay__categories}
              categories={categories}
            />
          )}
        </div>
      </a>
    </li>
  );
}