import React, {useState} from 'react';

import { useForm } from "formbold-react";

function Form() {
  const [state, handleSubmit] = useForm("https://formbold.com/s/9gO2O");

  if (state.succeeded) {
    return <div> Form submitted successfully</div>;
  }

  return (
    <>
      <h3>Report Advert Reactions</h3>
      <form
        onSubmit={handleSubmit}
        class="advert-form"
      >
        <label for="ad-details">Ad Details (if known):</label>
        <textarea
          id="ad-details"
          name="ad_details"
          placeholder="Describe the ad..."
        ></textarea>

        <label for="reaction-type">What would you like to report?</label>
        <select id="reaction-type" name="reaction_type" required>
          <option value="" disabled selected>
            Select a reaction type
          </option>
          <option value="positive">I liked the ad</option>
          <option value="negative">I disliked the ad</option>
          <option value="irrelevant">The ad was irrelevant</option>
          <option value="offensive">The ad was offensive</option>
          <option value="technical">There was a technical issue</option>
        </select>

        <label for="additional-comments">Additional Comments:</label>
        <textarea
          id="additional-comments"
          name="additional_comments"
          placeholder="Provide more details..."
        ></textarea>
        <button type="submit">Submit Feedback</button>
        <p class="note">
          We appreciate your feedback. Your report helps us improve user
          experience!
        </p>
      </form>
    </>
  );
}

export default ContactForm;