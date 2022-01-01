import Link from "next/link";
import { NEWS_PER_PAGE } from "@/config/index";

export default function Pagination({ page, total }) {
  const lastpage = Math.ceil(total / NEWS_PER_PAGE);
  return (
    <div>
      {page > 1 && (
        <Link href={`/news?page=${page - 1}`}>
          <a className="btn btn-secondary">Prev</a>
        </Link>
      )}
      {page < lastpage && (
        <Link href={`/news?page=${page + 1}`}>
          <a className="btn btn-secondary">Next</a>
        </Link>
      )}
    </div>
  );
}
