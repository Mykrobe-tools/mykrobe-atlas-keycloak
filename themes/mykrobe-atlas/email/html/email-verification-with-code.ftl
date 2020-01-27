<#import "template.ftl" as layout>
<@layout.htmlEmailLayout ; section>
  <#if section = "text">
    ${kcSanitize(msg("emailVerificationBodyCodeHtml",code))?no_esc}
  </#if>
</@layout.htmlEmailLayout>