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

  const submitForm = async (e) => {
    e.preventDefault();
  
    const formURL = e.target.action;
  
    try {
      const response = await fetch(formURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
  
        await prisma.subreddit.create({
          data: {
            name: data.name,
          },
        });
  
        setFormData({
          name: "",
        });
  
        setFormSuccess(true);
        setFormSuccessMessage(data.submission_text);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle fetch or Prisma error
    }
  };

  return (
    <div className={styles.form}>
      <p className={styles.formTitle}>Create Subreddit</p>
      {formSuccess ?
        <div>{formSuccessMessage}</div>
        :
        <form className={styles.formInput} method="POST" action="/api/subreddits" onSubmit={submitForm}>
          <div>
            <label className={styles.label}>Subreddit Name</label>
            <input className={styles.input} type="text" name="name" onChange={handleInput} value={formData.name} placeholder="Enter Subreddit Name.." required />
          </div>

          <button className={styles.formBtn} type="submit">Create</button>
        </form>
      }
    </div>
  )
}