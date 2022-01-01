import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Modal from "@/components/Modal";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

export default function EditNews(news) {
  const [values, setValues] = useState({
    name: news.name,
    detail: news.detail,
    date: moment(news.date).format("yyyy-MM-DD"),
    time: news.time,
  });

  const { name, detail, date, time } = values;
  const [imagePreview, setImagePreview] = useState(
    news.image.slice(-1)[0]
      ? news.image.slice(-1)[0].formats.thumbnail.url
      : null
  );

  const ImageUploaded = async () => {
    const res = await fetch(`${API_URL}/sports/${news.id}`);
    const data = await res.json();
    setImagePreview(data.image.slice(-1)[0].formats.thumbnail.url);
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const emptyFieldCheck = Object.values(values).some(
      (element) => element === ""
    );
    if (emptyFieldCheck) toast.error("Please fill All the Inputs");

    const response = await fetch(`${API_URL}/sports/${news.id}`, {
      method: "PUT",
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
    <Layout title="Edit News">
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
          <input className="btn" type="submit" value="Update News" />
        </form>
      </div>
      {imagePreview ? (
        <Image src={imagePreview} width={180} height={100}></Image>
      ) : (
        <div>
          <p>No Image Available</p>
        </div>
      )}
      <div>
        <button
          className="btn-edit"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Update Image
        </button>
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ImageUpload newsid={news.id} ImageUploaded={ImageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  //   Fetch data from external API
  const res = await fetch(`${API_URL}/sports/${id}`);
  const news = await res.json();
  //   Pass data to the page via props
  return { props: news };
}
