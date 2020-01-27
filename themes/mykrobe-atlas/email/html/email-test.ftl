<#import "template.ftl" as layout>
<@layout.htmlEmailLayout ; section>
  <#if section = "text">
    ${kcSanitize(msg("emailTestBodyHtml",realmName))?no_esc}
  </#if>
</@layout.htmlEmailLayout>