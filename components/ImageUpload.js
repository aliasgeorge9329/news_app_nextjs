import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ newsid, ImageUploaded }) {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "sports");
    formData.append("refId", newsid);
    formData.append("field", "image");
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      ImageUploaded();
    }
  }

  return (
    <div className={styles.form}>
      <h4>Upload Sports News Image</h4>
      <form>
        <div className={styles.file}>
          <input type="file" onChange={handleChange} />
        </div>
        <input
          type="submit"
          value="Upload"
          onClick={handleSubmit}
          className="btn"
        />
      </form>
    </div>
  );
}
