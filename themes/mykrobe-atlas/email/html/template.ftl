<#macro htmlEmailLayout>
<html>
<head>
<style type="text/css">
	body, p, table, td, div {
		color: #333;
		font-family: "HelveticaNeue", "Helvetica Neue", "Arial", "Helvetica", sans-serif;
	}

  body {
    background: #fff;
    -webkit-font-smoothing: antialiased;
    font-size: 17px;
    line-height: 24px;
    margin: 0;
    padding: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  table {
    border-collapse: collapse;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    width: 100%;
  }

  td {
    font-size: 17px;
    line-height: 24px;
    vertical-align: top;
  }

  a {
    color: #0d7da0;
  }

</style>
</head>
<body text="#333333" bgcolor="#FFFFFF">
<#if realmName??>
<table width="100%" bgcolor="#0d7da0" cellspacing="0" cellpadding="15"><tr><td>
<font style="font-size:24px;" size="5" color="#FFFFFF"><b>
${realmName}
</b></font>
</td></tr></table>
</#if>
<table width="100%" cellspacing="0" cellpadding="15"><tr><td>
<#nested "text">
</td></tr></table>
</body>
</html>
</#macro>