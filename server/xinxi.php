<?php
    header('content-type:text/html;charset=utf8');
    $name=$_POST["name"];
    $con=mysqli_connect('localhost','root','root','test');
    $res=mysqli_query($con,"select*from user where username='$name'");
    $row=mysqli_fetch_assoc($res);
    echo json_encode($row);