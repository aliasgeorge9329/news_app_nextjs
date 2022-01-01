import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    router.push(`/search?term=${term}`);
    setTerm("");
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          value={term}
          placeholder="Search News"
        />
      </form>
    </div>
  );
}
