<?php 

$to = "info@panacea.com.gh";


// check of form is submitted

if($_SERVER["REQUEST_METHOD"] == "POST" ) {
  // collect form data
  $ad_details = htmlspecialchars($_POST['ad_details']);
  $reaction_type = htmlspecialchars($_POST['reaction_type']);
  $additional_comments = htmlspecialchars($_POST['addition_comments']);

  // email subject

  $subject = "Advert Reaction Submitted on Your Website";

  // email body

  $message = "You have received a new advert reaction report:\n\n";
  $message .= "Ad Details: $ad_details\n";
  $message .= "Reaction Type: $reaction_type\n";
  $message .= "Additional Comments: $additional_comments\n";

  // email headers

  $headers = "From: no-reply@panacea.com.gh\r\n";
  $headers .= "Reply-to: no-reply@panacea.com.gh\r\n";

  // Send email

  if(mail($to, $subject, $message, $headers)){
    echo "Thank you! Your feedback has been sent";
  }else {
    echo "Sorry, something went wrong. Please try again";
  }
}else {
  echo "Invalid request method.";
}

?>