<?php
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['name']));
} else {$name = 'No name entered';}
if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$emailFrom = stripslashes(strip_tags($_POST['email']));
} else {$email = 'No email entered';}
if ((isset($_POST['message'])) && (strlen(trim($_POST['message'])) > 0)) {
	$message = stripslashes(strip_tags($_POST['message']));
} else {$message = 'No message entered';}
ob_start();
?>
This e-mail is from:  <?=$name;?> 
with email: <?=$emailFrom;?>


<?=$name;?> wrote:

<?=$message;?>
<?
$body = ob_get_contents();

$to = 'info@tictag.cc';
$email = "info@tictag.cc";
$fromaddress = $emailFrom;
$fromname = "Online Contact";

require("phpmailer.php");

$mail = new PHPMailer();

$mail->From     = $emailFrom;
$mail->FromName = $name;

$mail->WordWrap = 50;
$mail->IsHTML(true);

$mail->Subject  =  "People Contacting";
$mail->Body     =  $body;
$mail->AltBody  =  "This is the text-only body";

if(!$mail->Send()) {
	$recipient = "info@tictag.cc";
	$subject = 'People Contacting';
	$content = $body;	
  mail($recipient, $subject, $content, "From: $emailFrom\r\nReply-To: $emailFrom\r\nX-Mailer: DT_formmail");
  exit;
}
?>
