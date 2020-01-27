<#import "template.ftl" as layout>
<@layout.htmlEmailLayout ; section>
  <#if section = "text">
    ${kcSanitize(msg("eventLoginErrorBodyHtml",event.date,event.ipAddress))?no_esc}
  </#if>
</@layout.htmlEmailLayout>