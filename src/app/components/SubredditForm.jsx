'use client'
import React, { useState } from "react"
import styles from '@/app/page.module.css';

export default function SubredditForm() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e) => {
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) => {
      setFormData({
        name: "",
      })

      setFormSuccess(true)
      setFormSuccessMessage(data.submission_text)
    })
  }

  return (
    <div className={styles.form}>
      <p className={styles.formTitle}>Create Subreddit</p>
      {formSuccess ?
        <div>{formSuccessMessage}</div>
        :
        <form className={styles.formInput} method="POST" action="/api/subreddits" onSubmit={submitForm}>
          <div>
            <label className={styles.label}>Subreddit Name</label>
            <input className={styles.input} type="text" name="name" required onChange={handleInput} value={formData.name} placeholder="Enter Subreddit Name.." />
          </div>

          <button className={styles.formBtn} type="submit">Create</button>
        </form>
      }
    </div>
  )
}