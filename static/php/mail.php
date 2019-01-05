<?php

$mail = 'contact@js2-sciences.com';

if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail)) {
  $passage_ligne = "\r\n";
} else {
  $passage_ligne = "\n";
}

$boundary = "-----=".md5(rand());
$boundary_alt = "-----=".md5(rand());

$sujet = $_POST['sujet'];
        //=====Création du header de l'e-mail.
$header = "From: \"" . $_POST['name'] . "\" <" . $_POST['mail'] . ">".$passage_ligne;
$header.= "Reply-to: \"" . $_POST['name'] . "\" <" . $_POST['mail'] . ">".$passage_ligne;
$header.= "MIME-Version: 1.0".$passage_ligne;
$header.= "Content-Type: multipart/mixed;".$passage_ligne." boundary=\"$boundary\"".$passage_ligne;
        //==========
        //=====Création du message.
$message = $passage_ligne."--".$boundary.$passage_ligne;
$message.= "Content-Type: multipart/alternative;".$passage_ligne." boundary=\"$boundary_alt\"".$passage_ligne;
$message.= $passage_ligne."--".$boundary_alt.$passage_ligne;
        //=====Ajout du message au format texte.
$message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".$passage_ligne;
$message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
$message.= $passage_ligne.$_POST['main'];
        //==========
$message.= $passage_ligne."--".$boundary_alt.$passage_ligne;
$message.= $passage_ligne."--".$boundary.$passage_ligne;
        //=====Envoi de l'e-mail.
mail($mail,$sujet,$message,$header);

?>

