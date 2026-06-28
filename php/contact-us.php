<?php
// --- SERVER MAIL LOGIC ---
$success = false;
$error = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // 1. SETTINGS
    $to_email = "harukainfra@gmail.com";      // Owner Email
    $from_email = "info@harukainfra.in";        // Domain Email

    // 2. SAFE DATA RECEIVE
    $first_name = htmlspecialchars(trim($_POST['first_name'] ?? ''));
    $last_name = htmlspecialchars(trim($_POST['last_name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $company = htmlspecialchars(trim($_POST['company'] ?? ''));
    $position = htmlspecialchars(trim($_POST['position'] ?? ''));
    $country = htmlspecialchars(trim($_POST['country'] ?? ''));
    $province = htmlspecialchars(trim($_POST['province'] ?? ''));
    $message = htmlspecialchars(trim($_POST['text'] ?? ''));

    // Hidden Fields
    $url = htmlspecialchars(trim($_POST['url'] ?? ''));
    $catid = htmlspecialchars(trim($_POST['catid'] ?? ''));
    $modelid = htmlspecialchars(trim($_POST['modelid'] ?? ''));

    // 3. BASIC VALIDATION
    if (
        empty($first_name) ||
        empty($last_name) ||
        empty($email) ||
        empty($phone) ||
        empty($company) ||
        empty($position) ||
        empty($country) ||
        empty($province)
    ) {
        echo "<script>alert('Please fill all required fields.'); window.history.back();</script>";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Please enter a valid email address.'); window.history.back();</script>";
        exit;
    }

    // 4. EMAIL SUBJECT
    $mail_subject = "New Enquiry from Haruka Infra Website";

    // 5. EMAIL BODY WITH BETTER DESIGN
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>New Website Enquiry</title>
    </head>
    <body style='margin:0; padding:0; background:#eef3f8; font-family:Arial, Helvetica, sans-serif; color:#1f2937;'>

        <div style='width:100%; padding:30px 12px; background:#eef3f8;'>

            <div style='max-width:760px; margin:0 auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 12px 35px rgba(15, 23, 42, 0.12); border:1px solid #dbe4ee;'>

                <!-- Header -->
                <div style='background:linear-gradient(135deg, #062b4f, #0b72b9); padding:28px 30px; color:#ffffff;'>
                    <table width='100%' cellpadding='0' cellspacing='0'>
                        <tr>
                            <td>
                                <div style='font-size:13px; letter-spacing:1.5px; text-transform:uppercase; opacity:0.9;'>
                                    Haruka Infra Private Limited
                                </div>
                                <h1 style='margin:8px 0 0; font-size:26px; line-height:1.3; font-weight:700;'>
                                    New Website Enquiry Received
                                </h1>
                                <p style='margin:8px 0 0; font-size:14px; opacity:0.9;'>
                                    A new contact request has been submitted from your website.
                                </p>
                            </td>
                            <td align='right' style='vertical-align:top;'>
                                <div style='display:inline-block; background:rgba(255,255,255,0.16); border:1px solid rgba(255,255,255,0.28); color:#ffffff; padding:10px 14px; border-radius:30px; font-size:13px;'>
                                    Website Lead
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Lead Summary -->
                <div style='padding:24px 30px 10px;'>

                    <div style='background:#f8fbff; border:1px solid #dceafb; border-radius:14px; padding:18px 20px; margin-bottom:22px;'>
                        <table width='100%' cellpadding='0' cellspacing='0'>
                            <tr>
                                <td style='vertical-align:top;'>
                                    <div style='font-size:13px; color:#64748b; margin-bottom:5px;'>Customer Name</div>
                                    <div style='font-size:20px; color:#0f172a; font-weight:700;'>
                                        $first_name $last_name
                                    </div>
                                </td>
                                <td style='vertical-align:top; text-align:right;'>
                                    <div style='font-size:13px; color:#64748b; margin-bottom:5px;'>Contact</div>
                                    <div style='font-size:15px; color:#0f172a; font-weight:600;'>
                                        $phone
                                    </div>
                                    <div style='font-size:13px; color:#2563eb; margin-top:3px;'>
                                        $email
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Customer Details -->
                    <h2 style='font-size:18px; margin:0 0 12px; color:#062b4f;'>
                        Customer Details
                    </h2>

                    <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse:separate; border-spacing:0 10px;'>

                        <tr>
                            <td style='width:50%; padding-right:8px;'>
                                <div style='background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;'>
                                    <div style='font-size:12px; color:#64748b;'>First Name</div>
                                    <div style='font-size:15px; font-weight:600; color:#111827; margin-top:4px;'>$first_name</div>
                                </div>
                            </td>
                            <td style='width:50%; padding-left:8px;'>
                                <div style='background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;'>
                                    <div style='font-size:12px; color:#64748b;'>Last Name</div>
                                    <div style='font-size:15px; font-weight:600; color:#111827; margin-top:4px;'>$last_name</div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style='width:50%; padding-right:8px;'>
                                <div style='background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;'>
                                    <div style='font-size:12px; color:#64748b;'>Email Address</div>
                                    <div style='font-size:15px; font-weight:600; color:#2563eb; margin-top:4px;'>$email</div>
                                </div>
                            </td>
                            <td style='width:50%; padding-left:8px;'>
                                <div style='background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;'>
                                    <div style='font-size:12px; color:#64748b;'>Phone Number</div>
                                    <div style='font-size:15px; font-weight:600; color:#111827; margin-top:4px;'>$phone</div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style='width:50%; padding-right:8px;'>
                                <div style='background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;'>
                                    <div style='font-size:12px; color:#64748b;'>Company</div>
                                    <div style='font-size:15px; font-weight:600; color:#111827; margin-top:4px;'>$company</div>
                                </div>
                            </td>
                            <td style='width:50%; padding-left:8px;'>
                                <div style='background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;'>
                                    <div style='font-size:12px; color:#64748b;'>Department / Position</div>
                                    <div style='font-size:15px; font-weight:600; color:#111827; margin-top:4px;'>$position</div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style='width:50%; padding-right:8px;'>
                                <div style='background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;'>
                                    <div style='font-size:12px; color:#64748b;'>Country / Region</div>
                                    <div style='font-size:15px; font-weight:600; color:#111827; margin-top:4px;'>$country</div>
                                </div>
                            </td>
                            <td style='width:50%; padding-left:8px;'>
                                <div style='background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;'>
                                    <div style='font-size:12px; color:#64748b;'>State / Province</div>
                                    <div style='font-size:15px; font-weight:600; color:#111827; margin-top:4px;'>$province</div>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <!-- Message -->
                    <h2 style='font-size:18px; margin:22px 0 12px; color:#062b4f;'>
                        Product Requirement / Message
                    </h2>

                    <div style='background:#fffdf7; border:1px solid #f4d78b; border-left:5px solid #f59e0b; border-radius:14px; padding:18px 20px; line-height:1.7; font-size:15px; color:#374151;'>
                        " . nl2br($message) . "
                    </div>

                    <!-- System Details -->
                    <h2 style='font-size:18px; margin:24px 0 12px; color:#062b4f;'>
                        System Details
                    </h2>

                    <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse:collapse; overflow:hidden; border-radius:12px; border:1px solid #e2e8f0;'>
                        <tr>
                            <td style='background:#f8fafc; padding:13px 16px; border-bottom:1px solid #e2e8f0; width:35%; font-size:13px; color:#64748b; font-weight:600;'>Page URL</td>
                            <td style='padding:13px 16px; border-bottom:1px solid #e2e8f0; font-size:14px; color:#111827;'>$url</td>
                        </tr>
                        <tr>
                            <td style='background:#f8fafc; padding:13px 16px; border-bottom:1px solid #e2e8f0; font-size:13px; color:#64748b; font-weight:600;'>Category ID</td>
                            <td style='padding:13px 16px; border-bottom:1px solid #e2e8f0; font-size:14px; color:#111827;'>$catid</td>
                        </tr>
                        <tr>
                            <td style='background:#f8fafc; padding:13px 16px; font-size:13px; color:#64748b; font-weight:600;'>Model ID</td>
                            <td style='padding:13px 16px; font-size:14px; color:#111827;'>$modelid</td>
                        </tr>
                    </table>

                </div>

                <!-- CTA Footer -->
                <div style='padding:22px 30px 28px;'>
                    <div style='background:#062b4f; color:#ffffff; border-radius:14px; padding:18px 20px;'>
                        <table width='100%' cellpadding='0' cellspacing='0'>
                            <tr>
                                <td>
                                    <div style='font-size:16px; font-weight:700;'>Follow-up Required</div>
                                    <div style='font-size:13px; opacity:0.85; margin-top:5px;'>
                                        Reply directly to this email to contact the customer.
                                    </div>
                                </td>
                                <td align='right'>
                                    <a href='mailto:$email' style='display:inline-block; background:#ffffff; color:#062b4f; padding:10px 16px; border-radius:30px; text-decoration:none; font-size:13px; font-weight:700;'>
                                        Reply Now
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!-- Bottom Footer -->
                <div style='background:#f8fafc; border-top:1px solid #e2e8f0; padding:16px 30px; text-align:center; color:#64748b; font-size:12px;'>
                    This enquiry was submitted from Haruka Infra Private Limited website.
                </div>

            </div>
        </div>

    </body>
    </html>
    ";

    // 6. EMAIL HEADERS
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Haruka Infra Private Limited <$from_email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 7. HOSTINGER RETURN PATH
    $returnpath = "-f" . $from_email;

    // 8. SEND MAIL
    if (mail($to_email, $mail_subject, $email_body, $headers, $returnpath)) {
        echo "<script>
            alert('Query Submitted Successfully! We will contact you soon.');
            window.location.href = window.location.href;
        </script>";
        exit;
    } else {
        echo "<script>
            alert('Message failed to send. Please try again.');
            window.history.back();
        </script>";
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en-US">
<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>TDS Solar Energy</title>
    <link rel="canonical" href="contact-us.php" /><!-- public start -->
    <link rel="icon" href="favicon.png" type="image/png" />
    <link href="Public/En/fonts/iconfont/iconfont.css" type="text/css" rel="stylesheet" />
    <link href="Public/En/css/public.css" type="text/css" rel="stylesheet" />
    <link href="Public/En/css/base-v4.1.0.min.css" type="text/css" rel="stylesheet" />
    <link href="Public/En/css/main.css" type="text/css" rel="stylesheet" />
    <link href="Public/En/css/media.css" type="text/css" rel="stylesheet" />
    <script src="Public/En/js/jquery.min.js"></script>
    <!-- public end -->
    <link href="Public/En/css/intlTelInput.css" type="text/css" rel="stylesheet" />
</head>
<!-- Add sticky-body to body to show overflow content -->

<body>
    <!-- Add act to ys-page-wrap to keep the navigation always inverted -->
    <div class="ys-page-wrap inside-main touch-main ">
        <header class="ys-header">
            <div class="ys-header-cont">
                <!-- PC top navigation -->
                <div class="ys-hd-pc">
                    <div class="head-logo ys-imgbox-contain">
                        <a href="index.php">
                            <img src="Public/Uploads/uploadfile/images/20251110/logo.png" alt="logo.png">
                            <img src="Public/Uploads/uploadfile/images/20251110/logo.png" alt="logo.png">
                        </a>
                    </div>
                    <div class="ys-hd-pc-rightbox">
                        <div class="yhpr-left">
                            <div class="yhpr-top">
                                <div class="head-other">
                                    <ul class="head-other-list">
                                        <!-- Add on when selected -->
                                        <li class="head-other-list-li ">
                                            <a href="innovation.php" class="holl-link">
                                                Innovation </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="yhpr-bottom">
                                <ul class="head-nav">
                                    <li class="head-nav-item ">
                                        <div class="head-nav-item-nub">
                                            <a href="products.php" target="_self"
                                                class="head-nav-item-title">Products</a>
                                            <!-- Dropdown -->
                                            <div class="head-nav-item-down hnid-cry">
                                                <div class="ys-cont1400">
                                                    <div class="hnid-cry-top">
                                                        <div class="hnid-cry-top-tit">Products</div>
                                                        <div class="hnid-cry-top-info">
                                                            <div class="hcti-info">
                                                                Reliable Products that Meet Diverse Needs </div>
                                                            <div class="std-btnx3">
                                                                <a href="products.php" target="_self"
                                                                    class="std-btnx3-link">
                                                                    <div class="std-btnx3-link-img std-btnx3-link-img1">
                                                                        <img src="Public/En/images/a2_icon01.svg"
                                                                            alt="">
                                                                    </div>
                                                                    <div class="std-btnx3-link-text">All Products
                                                                    </div>
                                                                    <div class="std-btnx3-link-img std-btnx3-link-img2">
                                                                        <img src="Public/En/images/a2_icon01_1.svg"
                                                                            alt="">
                                                                        <img src="Public/En/images/mod_button2.png"
                                                                            alt="" class="std-btnx1-link-bg">
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="hnid-cry-bottom">
                                                        <ul class="hnid-cry-bottom-list">
                                                            <li class="hcbl-li ">
                                                                <a href="products/microinverter.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-526.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon15.svg"
                                                                            alt="a2_icon15.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">PV Modules
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>
                                                            <!-- Add on and yxnav-active2 for the selected secondary level -->
                                                            <li class="hcbl-li ">
                                                                <a href="products/microinverter.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-526.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon15.svg"
                                                                            alt="a2_icon15.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">Microinverters
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>
                                                            <li class="hcbl-li ">
                                                                <a href="products/pv-inverter.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-759.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-221.svg"
                                                                            alt="download.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">PV Inverters</div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>
                                                            <li class="hcbl-li ">
                                                                <a href="products/hybrid-inverter.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-107.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon17.svg"
                                                                            alt="a2_icon17.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">Hybrid Inverters
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>

                                                            <li class="hcbl-li ">
                                                                <a href="products/battery.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-519.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon19.svg"
                                                                            alt="a2_icon19.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">Lithium(LFP)Batteries
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>

                                                            <li class="hcbl-li ">
                                                                <a href="products/Grid+.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-790.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon22.svg"
                                                                            alt="a2_icon22.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">Grid+
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>
                                                            <li class="hcbl-li ">
                                                                <a href="products/wires.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-107.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon17.svg"
                                                                            alt="a2_icon17.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">Wires&Cables
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>
                                                            <li class="hcbl-li ">
                                                                <a href="products/solar-structures.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-107.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon17.svg"
                                                                            alt="a2_icon17.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">Solar Structures
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>
                                                            <li class="hcbl-li ">
                                                                <a href="products/earthing-systems.php" target="_self"
                                                                    class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-107.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon17.svg"
                                                                            alt="a2_icon17.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">Earthing Systems
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>
                                                            <li class="hcbl-li ">
                                                                <a href="#" target="_self" class="hcbl-li-link">
                                                                    <div class="ys-imgbox-cover">
                                                                        <img src="Public/Uploads/uploadfile/images/20251103/download-107.svg"
                                                                            alt="download.svg">
                                                                        <img src="Public/Uploads/uploadfile/images/20251112/a2icon17.svg"
                                                                            alt="a2_icon17.svg">
                                                                    </div>
                                                                    <div class="hcbl-li-link-text">Protection Devices
                                                                    </div>
                                                                    <img src="Public/En/images/mod_button.png" alt=""
                                                                        class="std-btnx1-link-bg">
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="head-nav-item ">
                                        <div class="head-nav-item-nub">
                                            <a href="company.php" target="_self"
                                                class="head-nav-item-title">Company</a>
                                            <!-- Dropdown -->
                                        </div>
                                    </li>
                                    <li class="head-nav-item ">
                                        <div class="head-nav-item-nub">
                                            <a href="tdsgroup.php" target="_self" class="head-nav-item-title">TDS
                                                Groups</a>
                                            <!-- Dropdown -->
                                        </div>
                                    </li>
                                    <li class="head-nav-item ">
                                        <div class="head-nav-item-nub">
                                            <a href="partner.php" class="head-nav-item-title">Partners</a>
                                            <!-- Dropdown -->
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="yhpr-right">
                            <div class="yhpr-bottom-cont">
                                <a href="contact-us.php" target="_self" class="yhpr-bottom-cont-link">
                                    <div class="ybcl-text">
                                        Contact Us </div>
                                    <img src="Public/En/images/mod_button.png" alt="" class="std-btnx1-link-bg">
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- PH top navigation -->
            <div class="ys-hd-ph">
                <nav class="ys-ph-navbar ys-ph-navbar4">
                    <!-- Navigation bar -->
                    <div class="ys-phnav-header">
                        <!-- Menu button -->
                        <div class="ys-phnav-menubox">
                            <div class="ys-phnav-menubtn">
                                <span></span>
                            </div>
                        </div>
                        <!-- logo -->
                        <div class="ys-phnav-logo">
                            <a href="index.php">
                                <img src="Public/Uploads/uploadfile/images/20251110/logo.png" alt="logo.png">
                            </a>
                        </div>
                        <div class="ys-phnav-other">
                            <!-- Language -->
                            <div class="ys-phnav-language">
                                <!-- 12.2 Language start -->
                                <div class="ys-phnav-header-font">
                                    <div class="ys-imgbox-cover">
                                        <img src="Public/En/images/ys_icon4_2.svg" alt="">
                                        <img src="Public/En/images/ys_icon4_1.svg" alt="">
                                    </div>
                                    <div class="ys-imgbox-cover head-lang-top-jian">
                                        <img src="Public/En/images/ys_icon7_1.svg" alt="">
                                        <img src="Public/En/images/ys_icon7.svg" alt="">
                                    </div>
                                </div>

                                <!-- 12.2 Language end -->
                            </div>
                            <!-- Search -->
                            <div class="ys-phnav-search">
                                <!-- Search button -->
                                <i class="iconfont icon-search ys-phnavss-btn"></i>
                                <!-- Search popup -->
                                <div class="ys-modal ys-phnavss-modal ys-phnav-search-box">
                                    <div class="ys-modal-wrap">
                                        <div class="ys-modal-close">
                                            <i class="iconfont icon-close"></i>
                                        </div>
                                        <div class="ys-modal-container">
                                            <div class="ys-cont1200">
                                                <div class="yspc-wrap-tit">What can we help you find?</div>
                                                <div class="yspc-wrap-input">
                                                    <div class="yspc-wrap-input-text">
                                                        <input type="text" placeholder="Please enter the keyword"
                                                            id="phkeywords">
                                                    </div>
                                                    <button type="button" class="yspc-wrap-input-icon"
                                                        onclick="phsearch()">
                                                        <i class="iconfont icon-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Dropdown menu -->
                    <div class="ys-phnav-menu">
                        <!-- Navigation -->
                        <div class="ys-phmenu-scroll">
                            <ul class="ys-ph-nav">
                                <!-- Add the class name ys-phnav-haschild when there is a submenu; no need to check whether the plus/minus icon exists -->
                                <li class="ys-phnav-haschild ">
                                    <div class="ys-phnav-lisbox">
                                        <a href="products.php" target="_self">
                                            <div class="ys-phnav-header-font">Products</div>
                                        </a>
                                        <div class="ys-phnav-icon"></div>
                                    </div>
                                    <!-- Secondary level -->
                                    <ul>
                                        <li class="">
                                            <div class="ys-phnav-lisbox">
                                                <a href="products/microinverter.php" target="_self">
                                                    <div class="ys-phnav-header-font">Microinverter</div>
                                                </a>
                                                <div class="ys-phnav-icon"></div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="ys-phnav-lisbox">
                                                <a href="products/pv-inverter.php" target="_self">
                                                    <div class="ys-phnav-header-font">PV Inverter</div>
                                                </a>
                                                <div class="ys-phnav-icon"></div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="ys-phnav-lisbox">
                                                <a href="products/hybrid-inverter.php" target="_self">
                                                    <div class="ys-phnav-header-font">Hybrid Inverter</div>
                                                </a>
                                                <div class="ys-phnav-icon"></div>
                                            </div>
                                        </li>

                                        <li class="">
                                            <div class="ys-phnav-lisbox">
                                                <a href="products/battery.php" target="_self">
                                                    <div class="ys-phnav-header-font">Battery</div>
                                                </a>
                                                <div class="ys-phnav-icon"></div>
                                            </div>
                                        </li>

                                        <li class="">
                                            <div class="ys-phnav-lisbox">
                                                <a href="products/Grid+.php" target="_self">
                                                    <div class="ys-phnav-header-font">Grid +</div>
                                                </a>
                                                <div class="ys-phnav-icon"></div>
                                            </div>
                                        </li>
                                        <li class="">
                                            <div class="ys-phnav-lisbox">
                                                <a href="products/wires.php" target="_self">
                                                    <div class="ys-phnav-header-font">Wires</div>
                                                </a>
                                                <div class="ys-phnav-icon"></div>
                                            </div>
                                        </li>

                                    </ul>
                                </li>
                                <li class=" ">
                                    <div class="ys-phnav-lisbox">
                                        <a href="company.php" target="_self">
                                            <div class="ys-phnav-header-font">Company</div>
                                        </a>
                                        <div class="ys-phnav-icon"></div>
                                    </div>
                                    <!-- Secondary level -->
                                    <ul>
                                    </ul>
                                </li>
                                <li class=" ">
                                    <div class="ys-phnav-lisbox">
                                        <a href="partner.php">
                                            <div class="ys-phnav-header-font">Partners</div>
                                        </a>
                                        <div class="ys-phnav-icon"></div>
                                    </div>
                                    <!-- Secondary level -->
                                    <ul>
                                    </ul>
                                </li>
                                <li class=" ">
                                    <div class="ys-phnav-lisbox">
                                        <a href="innovation.php" target="_self">
                                            <div class="ys-phnav-header-font">Innovation</div>
                                        </a>
                                        <div class="ys-phnav-icon"></div>
                                    </div>
                                    <!-- Secondary level -->
                                    <ul>
                                    </ul>
                                </li>
                                <li class=" ">
                                    <div class="ys-phnav-lisbox">
                                        <a href="#" target="_self">
                                            <div class="ys-phnav-header-font">News</div>
                                        </a>
                                        <div class="ys-phnav-icon"></div>
                                    </div>
                                    <!-- Secondary level -->
                                    <ul>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <!-- 12.31 start -->
                        <div class="yhpr-bottom-cont yhpr-bottom-cont-newph">
                            <a href="contact-us.php" target="_self" class="yhpr-bottom-cont-link">
                                <div class="ybcl-text">
                                    Contact Us </div>
                                <img src="Public/En/images/mod_button.png" alt="" class="std-btnx1-link-bg">
                            </a>
                        </div>
                        <!-- 12.31 end -->
                    </div>
                </nav>
            </div>
        </header><!-- Main content -->
        <main class="ys-main">
            <!-- page start -->
            <!-- Inner page banner area -->
            <section class="ys-nybanner tds-contact-banner">
                <div class="ys-nyban-img">
                    <img class="ys-nyban-pc" src="Public/Uploads/uploadfile/images/20251104/download-482.jpg"
                        alt="download.jpg">
                    <img class="ys-nyban-ph" src="Public/Uploads/uploadfile/images/20251104/download-198.jpg"
                        alt="download.jpg">
                </div>

                <div class="ys-nyban-title ys-cont1440 ys-pos-center tds-contact-banner-content">

                    <h1 class="std-font72 wow ys-fadeup1">Talk To Our Solar Experts</h1>
                    <!-- Right Side Toggle -->
                    <div class="tds-contact-banner-right wow ys-fadeup2">

                        <a href="https://tdssolar.in/tools/" target="_blank" class="tds-solar-toggle ">
                            <div class="tds-toggle-left">
                                <span class="tds-toggle-icon">
                                    <i class="fa-solid fa-calculator"></i>
                                </span>

                                <div class="tds-toggle-text">
                                    <h4>Calculate Your Solar Size</h4>
                                    <p>Check your required solar system capacity.</p>
                                </div>
                            </div>

                            <span class="tds-toggle-switch">
                                <span></span>
                            </span>
                        </a>

                        <a href="https://script.google.com/macros/s/AKfycbzGhO4dWlaIwbW35Szfln-gKUIECJ4vruyDRPhW28jZvegt7Lv8UI0Qe6RdX4GaKzeKOA/exec"
                            target="_blank" class="tds-solar-toggle">
                            <div class="tds-toggle-left">
                                <span class="tds-toggle-icon">
                                    <i class="fa-solid fa-solar-panel"></i>
                                </span>

                                <div class="tds-toggle-text">
                                    <h4>Build Your Solar</h4>
                                    <p>Create your custom solar solution online.</p>
                                </div>
                            </div>

                            <span class="tds-toggle-switch">
                                <span></span>
                            </span>
                        </a>

                    </div>

                </div>
            </section>
            <!-- Content area -->
            <section class="touch-submit">
                <div class="ys-cont1600">
                    <ul class="ys-bread ys-flex-center wow ys-fadeup2">
                        <li class="ys-bread-list">
                            <a href="index.php">Home</a>
                        </li>
                        <li class="ys-bread-list">
                            <a href="contact-us.php" target="">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div class="ys-cont1440">
                    <form class="ys-form wow ys-fadeup1" id="myform" method="post" action="">
                        <input type="hidden" name="url">
                        <input type="hidden" name="catid" value="12">
                        <input type="hidden" name="modelid" value="53">
                        <ul class="ys-form-inof" data-tips="Please complete this required field.">
                            <li class="ys-form-inof-item ys-form-inof-item2 ys-form-required">
                                <label>
                                    <div class="ys-fii-name">First Name <span>*</span></div>
                                    <div class="ys-fii-input">
                                        <input type="text" autocomplete="off" placeholder="Please enter your name"
                                            name="first_name">
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span></div>
                            </li>
                            <li class="ys-form-inof-item ys-form-inof-item2 ys-form-required">
                                <label>
                                    <div class="ys-fii-name">Last Name <span>*</span></div>
                                    <div class="ys-fii-input">
                                        <input type="text" autocomplete="off" placeholder="Please enter your last name"
                                            name="last_name">
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span></div>
                            </li>
                            <li class="ys-form-inof-item ys-form-inof-item2 ys-form-required ys-form-email"
                                data-tips="Please fill in the correct email format.">
                                <label>
                                    <div class="ys-fii-name">Email <span>*</span></div>
                                    <div class="ys-fii-input">
                                        <input type="text" autocomplete="off" placeholder="Please enter your Email"
                                            name="email">
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span><i></i></div>
                            </li>
                            <li class="ys-form-inof-item ys-form-inof-item2 ys-form-required ys-form-phone"
                                data-init="in" data-tips="Please fill in the correct phone number.">
                                <label>
                                    <div class="ys-fii-name">Phone <span>*</span></div>
                                    <div class="ys-fii-input">
                                        <input type="text" class="telnum" placeholder="Please enter your Phone"
                                            name="phone">
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span><i></i></div>
                            </li>
                            <li class="ys-form-inof-item ys-form-inof-item2 ys-form-required ">
                                <label>
                                    <div class="ys-fii-name">Company <span>*</span></div>
                                    <div class="ys-fii-input">
                                        <input type="text" autocomplete="off" placeholder="Please enter your Company"
                                            name="company">
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span><i></i></div>
                            </li>
                            <li class="ys-form-inof-item ys-form-inof-item2 ys-form-required ">
                                <label>
                                    <div class="ys-fii-name">Department/Position <span>*</span></div>
                                    <div class="ys-fii-input">
                                        <input type="text" autocomplete="off" placeholder="Department/Position"
                                            name="position">
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span><i></i></div>
                            </li>
                            <li class="ys-form-inof-item ys-form-inof-item2 ys-form-required ">
                                <label>
                                    <div class="ys-fii-name">Country/Region <span>*</span></div>
                                    <div class="ys-fii-input">
                                        <input type="text" autocomplete="off"
                                            placeholder="Please enter your Country/Region" name="country">
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span><i></i></div>
                            </li>
                            <li class="ys-form-inof-item ys-form-inof-item2 ys-form-required ">
                                <label>
                                    <div class="ys-fii-name">State <span>*</span></div>
                                    <div class="ys-fii-input">
                                        <input type="text" autocomplete="off"
                                            placeholder="Please enter your Province/State" name="province">
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span><i></i></div>
                            </li>
                            <li class="ys-form-inof-item ys-form-inof-text">
                                <label>
                                    <div class="ys-fii-name">Please enter the product you want to know, the selection
                                        requirements or more technical advice:</div>
                                    <div class="ys-fii-input">
                                        <textarea name="text" id="" cols="30" rows="10" autocomplete="off"
                                            placeholder="Message"></textarea>
                                    </div>
                                </label>
                                <div class="ys-fii-tips"><span></span></div>
                            </li>
                            <li class="ys-form-inof-item yfii-info">

                                <!-- Submit -->
                                <div class="yfii-ri">
                                    <div class="yfii-ri-box ys-form-inof-item ys-fii-submit ys-form-required">
                                        <div class="std-btnx1-link">
                                            <div class="std-btnx1-link-icon std-btnx1-link-icon1">
                                                <img src="Public/En/images/a1_icon10.svg" alt="">
                                            </div>
                                            <div class="std-btnx1-link-font">Submit</div>
                                            <div class="std-btnx1-link-icon std-btnx1-link-icon2">
                                                <img src="Public/En/images/a1_icon10.svg" alt="">
                                            </div>
                                            <img src="Public/En/images/mod_button.png" alt="" class="std-btnx1-link-bg">
                                        </div>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </section>
            <section class="touch-global wow ys-fadeup1">
                <div class="ys-cont1600">
                    <div class="touch-global-left ">
                        <h2 class="std-font44 ">
                          Registered Office </h2>
                        <div class="std-text18">
                            <p>
                                If you would like more information about TDS SOLAR ENERGY products, or if you would like
                                to
                                discuss price and availability, please complete the form opposite and we will be in
                                touch shortly. </p>
                        </div>
                    </div>
                    <ul class="touch-global-inof ">

                        <li class="touch-global-inof-nub">
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                                <div class="ys-imgbox-cover tgin-icon" style="flex-shrink:0;">
                                    <img src="Public/En/images/0square.png" alt="">
                                    <img src="Public/En/images/g1_icon_03.svg" alt="">
                                </div>

                                <span class="tgin-icon-num"
                                    style="display:inline-block; margin:0; font-size:18px; font-weight:600; color:#fff;">
                                    TDS Solar Energies
                                </span>
                            </div>

                            <div class="std-text16 tgin-txt">
                                <p>
                                    <a href="https://www.google.com/maps/dir//TDS+SOLAR+ENERGY+(AUTH+WAAREE+PARTNERS)+PM+SURYA+GHAR+YOJANA+%26+EPC+PROJECTS,+VIP+Rd,+OMKAR+NAGAR,+Fatehpur,+Uttar+Pradesh+212601/@25.9361436,80.7979185,16z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x399c9d49e4fa7189:0x3a1d348db3540d71!3e0?hl=en&g_ep=Eg1tbF8yMDI2MDUyNV8wIJvbDyoASAJQAg%3D%3D"
                                        target="_blank" style="color:inherit; text-decoration:none;">
                                        0, VIP ROAD OMKAR NAGAR, FATEHPUR, 212601 U.P.
                                    </a>
                                </p>
                            </div>

                            <div class="tgin-case"></div>
                        </li>

                        <li class="touch-global-inof-nub">
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                                <div class="ys-imgbox-cover tgin-icon" style="flex-shrink:0;">
                                    <img src="Public/En/images/0square.png" alt="">
                                    <img src="Public/En/images/g1_icon_02.svg" alt="">
                                </div>

                                <span class="tgin-icon-num"
                                    style="display:inline-block; margin:0; font-size:18px; font-weight:600; color:#fff;">
                                    Call Us
                                </span>
                            </div>

                            <div class="std-text16 tgin-txt">
                                <p>
                                    <a href="tel:+917800010013" target="_blank">+91 7800010013 (B2B & Bulk
                                        Enquiries)</a>
                                </p>
                                <p>
                                    <a href="tel:+917800010064" target="_blank">+91 7800010064 (Residential
                                        Enquiries)</a>
                                </p>
                                <p>
                                    <a href="tel:+917800010016" target="_blank">+91 7800010016 (C&I Enquiries)</a>
                                </p>
                                <p>
                                    <a href="tel:+917800070017" target="_blank">+91 7800070017 (Service & Support)</a>
                                </p>
                            </div>

                            <div class="tgin-case"></div>
                        </li>

                        <li class="touch-global-inof-nub">
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                                <div class="ys-imgbox-cover tgin-icon" style="flex-shrink:0;">
                                    <img src="Public/En/images/0square.png" alt="">
                                    <img src="Public/En/images/g1_icon_01.svg" alt="">
                                </div>

                                <span class="tgin-icon-num"
                                    style="display:inline-block; margin:0; font-size:18px; font-weight:600; color:#fff;">
                                    Email Us
                                </span>
                            </div>

                            <div class="std-text16 tgin-txt">
                                <p>
                                    <a href="mailto:tds@tdssolar.in" target="_blank">tds@tdssolar.in</a>
                                </p>
                                <p>
                                    <a href="mailto:tdsagro@waareepartners.com"
                                        target="_blank">tdsagro@waareepartners.com</a>
                                </p>
                                <p>
                                    <a href="mailto:tdssolarenergy@gmail.com"
                                        target="_blank">tdssolarenergy@gmail.com</a>
                                </p>
                            </div>

                            <div class="tgin-case"></div>
                        </li>

                    </ul>
                </div>
                <div class="touch-global-bg">
                    <img src="Public/Uploads/uploadfile/images/20251104/download-752.png" alt="download.jpg">
                </div>
            </section>

            <!-- page end -->
        </main>
        <!-- Footer -->
        <footer class="ys-footer">
            <!-- Background -->
            <img src="Public/En/images/com_bg01.jpg" alt="" class="ys-footer-bg">
            <div class="ys-cont1600">
                <div class="footer-top">
                    <div class="footer-logo">
                        <a href="index.php">
                            <img src="Public/Uploads/uploadfile/images/20251218/logonew1White.png"
                                alt="logo-new 1 (White).png">
                        </a>
                        <form id="subform" onsubmit="return false">
                            <input type="hidden" name="catid" value="1">
                            <input type="hidden" name="modelid" value="43">
                            <div class="footer-logo-input">
                                <input type="text" placeholder="Your email..." name="email">
                                <div class="footer-logo-input-btn" onclick="subform()">
                                    <a href="javascript:void(0);" class="flib-link">
                                        <img src="Public/En/images/ys_icon8.svg" alt="" class="flib-img">
                                        <div class="flib-text">Subscribe</div>
                                        <img src="Public/En/images/mod_button.png" alt="" class="std-btnx1-link-bg">
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <ul class="footer-nav">
                        <li><a href="products.php">Products</a>
                            <ul>
                                <li><a href="products/microinverter.php">Microinverter</a></li>
                                <li><a href="products/pv-inverter.php">PV&nbsp;inverter</a></li>
                                <li><a href="products/hybrid-inverter.php">Hybrid&nbsp;inverter</a></li>
                                <li><a href="products/battery.php">Battery</a></li>
                                <li><a href="products/Grid+.php">Grid&nbsp;+</a></li>
                                <li><a href="products/wires.php">Wires</a></li>
                            </ul>
                        </li>
                        <li><a href="company.php">About Us</a>
                            <ul>
                                <li><a href="company.php">Company</a></li>
                                <li><a href="innovation.php">Innovation</a></li>
                                <li><a href="#">News</a></li>
                                <li><a href="contact-us.php">Contact Us</a></li>
                            </ul>
                        </li>

                        <li><a href="partner.php" textvalue="Partners">Partners</a>
                            <ul>
                                <li><a href="#" target="_blank">Installer program</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul class="footer-share">
                    <li>
                        <a href="https://www.facebook.com/people/Tdssolarenergy/61559624085580/" target="_blank"
                            class="footer-share-btn" target="_blank" rel="noopenner noreferrer">
                            <div class="ys-imgbox-cover">
                                <img src="Public/En/images/0square.png" alt="">
                                <img src="Public/Uploads/uploadfile/images/20251218/01.svg" alt="01.svg">
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/@TDSSOLARPOWER/" target="_blank" class="footer-share-btn"
                            target="_blank" rel="noopenner noreferrer">
                            <div class="ys-imgbox-cover">
                                <img src="Public/En/images/0square.png" alt="">
                                <img src="Public/Uploads/uploadfile/images/20251218/02.svg" alt="02.svg">
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href=" " target="_blank" class="footer-share-btn" target="_blank" rel="noopenner noreferrer">
                            <div class="ys-imgbox-cover">
                                <img src="Public/En/images/0square.png" alt="">
                                <img src="Public/Uploads/uploadfile/images/20251218/03.svg" alt="03.svg">
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/tds_solar_energy" target="_blank" class="footer-share-btn"
                            target="_blank" rel="noopenner noreferrer">
                            <div class="ys-imgbox-cover">
                                <img src="Public/En/images/0square.png" alt="">
                                <img src="Public/Uploads/uploadfile/images/20251218/04.svg" alt="04.svg">
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="footer-bot">
                    <div class="footer-text">
                        <span>COPYRIGHT 2026 © TDS SOLAR ENERGY </span>  <a target="_blank"
                            href="https://shreemeeracorp.com/"><span style="color: aliceblue;"> Designed By
                                Shreemeeracorp Pvt Ltd.</span></a>
                    </div>

                </div>
            </div>
        </footer>
        <script>
            var $form_email = $("#subform");
            var loading = false;

            function subform() {
                if (!loading) {
                    loading = true;
                    $.ajax({
                        // Parameters
                        url: "/En/Index/formView",
                        data: $form_email.serialize(),
                        dataType: "json",
                        type: "POST",
                        // Execute
                        success: function (data) {
                            loading = false;
                            if (data.status == "success") {
                                window.location.href = "success.php";
                            } else {
                                layer.alert(
                                    data.info, {
                                    'title': "information",
                                    'btn': ["OK"]
                                }
                                );
                            }
                        }, error: function (data) {
                            loading = false;
                            checkForm.changeVerifyImg($form_email.find("img[name='verifyImg']"));
                            layer.open({
                                title: "调试模式",
                                content: data.responseText
                            });
                        }
                    });
                }
            }
        </script>
    </div>
    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/917800010016" class="whatsapp-float" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
    </a>

    <style>
        .whatsapp-float {
            position: fixed;
            right: 25px;
            bottom: 25px;
            width: 65px;
            height: 65px;
            z-index: 9999;
            animation: waveMove 1.8s infinite;
        }

        .whatsapp-float img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(37, 211, 102, 0.6);
        }

        /* Swing Animation */
        @keyframes waveMove {
            0% {
                transform: rotate(0deg) translateY(0);
            }

            15% {
                transform: rotate(15deg) translateY(-4px);
            }

            30% {
                transform: rotate(-15deg) translateY(0);
            }

            45% {
                transform: rotate(12deg) translateY(-4px);
            }

            60% {
                transform: rotate(-12deg) translateY(0);
            }

            75% {
                transform: rotate(8deg) translateY(-2px);
            }

            100% {
                transform: rotate(0deg) translateY(0);
            }
        }
    </style>
    <!-- public start -->
    <script>
        window.onload = function () {
            dataStatistics("/En/Index/dataStatistics?&catid=12");
        }
    </script><!-- public start -->
    <script src="Public/En/js/public.js"></script>
    <script src="Public/En/js/base-v4.1.0.min.js"></script>
    <script src="Public/En/js/common.js"></script>
    <script type="text/javascript" src="Public/En/Yongsy/Yongsy.js"></script>
    <script type="text/javascript" src="Public/jqueryui/layer/layer.js"></script>
    <!-- public end -->
    <script type="text/javascript" src="Public/En/js/intlTelInput.js"></script>
    <script type="text/javascript" src="Public/En/js/dialCode.js"></script>
    <!-- public end -->
    <script>
        $(function () {

        })
        if ($(window).width() < 768) {
            ys.mCustomScrollbarInit('.touch-contact-top', 'outside', 'x');
            $('.touch-contact-top').mCustomScrollbar("scrollTo", ".touch-contact-inof-nub.on", "left");
        }
        if ($(window).width() > 1119) {
            var gsap_global = gsap.timeline();
            gsap_global.to('.touch-global-bg', {
                y: '100',
                duration: 3,
                ease: Power3.ease,
            })
            ScrollTrigger.create({
                animation: gsap_global,
                trigger: '.touch-global',
                endTrigger: '.touch-global',
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            });
        }

        // Tab
        $('.touch-contact-inof-nub').click(function () {
            var index = $(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            $('.touch-contact-tab-nub').eq(index).stop().fadeIn().siblings('.touch-contact-tab-nub').stop().hide();
            if ($(window).width() < 768) {
                $('.touch-contact-top').mCustomScrollbar("scrollTo", ".touch-contact-inof-nub.on", "left");
            }
        })
        $('.touch-contact-inof-nub').eq(0).addClass('on');


        $('input[name="url"]').val(document.referrer);
        var $form = $("#myform")
        var loading = false;

        $(function () {
            // Initialize
            ys.form_init();
            // Select dropdown with form and search
            ys.select_search(".ys-fii-select-search", 'value', function (data) { console.log(data) });
            // Country and phone linkage
            $('.ys-form-inof-country').each(function () {
                var code = $(this).attr('data-init');
                var value1 = $(this).find('.ys-select-li[data-code=' + code + ']').attr('data-value');
                $(this).find('.ys-select-show').val(value1);
            });
            $('.ys-form-inof-country').on('click', '.ys-select-li', function () {
                var value1 = $(this).data('code');
                phoneInput.setCountry(value1);
            })
            // Embedded search
            ys.select_input();
            // Regular form dropdown
            ys.select_search(".ys-fii-select", 'value', function (data) { console.log(data) });
            // The first value can be overseas gl, domestic cn, or domestic including Hong Kong, Macao, and Taiwan hmt; default is domestic ('gl','cn','hmt')
            // The second value is the callback after success
            ys.tips('gl', function () {
                if (!loading) {
                    loading = true;
                    $.ajax({
                        // Parameters
                        url: "/En/Index/formView",
                        data: $form.serialize(),
                        dataType: "json",
                        type: "POST",
                        // Execute
                        success: function (data) {
                            loading = false;
                            checkForm.changeVerifyImg($form.find("img[name='verifyImg']"));
                            if (data.status == "success") {
                                window.location.href = "success.php";
                            } else {
                                layer.alert(
                                    data.info, {
                                    'title': "information",
                                    'btn': ["OK"]
                                }
                                );
                            }
                        }, error: function (data) {
                            loading = false;
                            checkForm.changeVerifyImg($form.find("img[name='verifyImg']"));
                            layer.open({
                                title: "Debug mode",
                                content: data.responseText
                            });
                        }
                    });
                }
            });
        });
    </script>
    <script>
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector(".ys-fii-submit");
    const form = document.getElementById("myform");

    if (submitBtn && form) {
        submitBtn.addEventListener("click", function () {
            form.submit();
        });
    }
});
</script>
</body>

</html>