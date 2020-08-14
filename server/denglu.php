<?php
    header('content-type:text/html;charset=utf8');
    $username=$_POST["username"];
    $password=$_POST["password"];
    $con=mysqli_connect('localhost','root','root','test');
    $res=mysqli_query($con,"select*from user where username='$username'");
    $row=mysqli_fetch_assoc($res);
    if($row){
        if($row["password"]==$password){
            $arr[0]=$row["name"];
            $arr[1]=$row["tou"];
            echo json_encode($arr);
        }else{
            echo "no";
        }
    }else{
        echo "no";
    }
    