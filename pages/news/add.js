import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddNews() {
  const [values, setValues] = useState({
    name: "",
    detail: "",
    date: "",
    time: "",
  });

  const { name, detail, date, time } = values;

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const emptyFieldCheck = Object.values(values).some(
      (element) => element === ""
    );
    if (emptyFieldCheck) toast.error("Please fill All the Inputs");

    const response = await fetch(`${API_URL}/sports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    console.log(response);

    if (!response.ok) {
      toast.error("Someting went Error");
    } else {
      const sport = await response.json();
      router.push(`/news/${sport.slug}`);
    }
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Layout title="Add News">
      <div>
        <Link href="/news">Go back</Link>
        <h1>Add News</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                id="name"
                value={name}
                onChange={handleOnChange}
              />
            </div>

            <div>
              <label htmlFor="date">Date</label>
              <input
                name="date"
                type="date"
                id="date"
                value={date}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input
                name="time"
                type="text"
                id="time"
                value={time}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="detail">Details</label>
            <textarea
              name="detail"
              type="text"
              id="detail"
              value={detail}
              onChange={handleOnChange}
            />
          </div>
          <input className="btn" type="submit" value="Add News" />
        </form>
      </div>
    </Layout>
  );
}
