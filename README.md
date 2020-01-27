# makeandship-keycloak-themes

## Local development

Install dependencies

```bash
$ yarn
$ yarn build
```

### Local keycloak for theme development

Local keycloak development environment and email servers are available on:

* Keycloak: http://localhost:8080 
* Mail server: http://localhost:8082

#### Starting local environment

```bash
$ yarn docker:start
```

#### Stopping local environment

```bash
$ yarn docker:stop
```

#### Clearing postgres data

```bash
$ yarn docker:remove:data
```

> will stop containers before clearing the postgres volume

#### Clearing all containers and images

```bash
$ yarn docker:clean
```

### Sass for theme development

Run sass with auto-reload

```bash
$ yarn web-dev
```

## Building

The theme can be built using the following commands:

```bash
$ yarn
$ yarn build
```

The theme will then be built at `/themes/<project name>`, ready for use in the local Keycloak server.

## Local Keycloak server
A local Keycloak server for developing and testing the theme is available as a Docker container.

> If you are running a projects on OSX from outside the `/Users` directory enable file sharing for your project under `Docker > Preferences > File Sharing` adding your directory then using `Apply & Restart`

To bring up the server, make sure you’ve installed and started [Docker Community Edition](https://docs.docker.com/engine/installation/), then use the following commands:

```bash
$ yarn
$ yarn build
$ docker-compose up
```

> You can confirm the server has fully started by looking under `docker logs keycloak` to see the line e.g.  `12:40:14,999 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0025: Keycloak 4.3.0.Final (WildFly Core 3.0.8.Final) started in 39745ms - Started 546 of 882 services (604 services are lazy, passive or on-demand)`

The Keycloak server will now be available on <http://localhost:8080>. You can log into the Administration Console using “**admin**” as both username and password.

## Testing Keycloak e-mails
The local Keycloak server includes MailDev, a mock SMTP server that you can use to receive and view Keycloak e-mails. It is available on <http://localhost:8082>.

To set up the local Keycloak server to send e-mails to MailDev:

1. Log in to [the local Keycloak server](http://localhost:8080).

2. Go to the “Email” tab in “Realm Settings”

3. Enter the following details:

    - Host: **maildev**

    - From: **keycloak@keycloak**

4. Click on “Save”

5. Click on “Admin” in the top-right-hand corner of the page, and click on “Manage Account”

6. Add an e-mail address to the admin account.

    It doesn’t matter what e-mail address you add, as all e-mails will be caught by MailDev. But you do need to add one, otherwise Keycloak will not send e-mails for this account.

    > At this point server sent verification email but being still logged in, I couldn't verify.  [Logout](http://localhost:8080/auth/realms/master/protocol/openid-connect/logout) if this happens.

    > Email address can be used to login after this change.

The local Keycloak server should now be set up to send e-mails to MailDev. To check that it’s working:

1. Click on the “Back to Security Admin Console” link

2. Click on the “Login” tab in “Realm Settings”

3. Enable “Forgot password”, and click on “Save”

4. Sign out.

5. On the Keycloak log in screen, click on the “Forgot your password?” link

6. Enter your username (**admin**) in the text field, and submit the form.

7. Visit [MailDev](http://localhost:8082). You should see a reset password e-mail from Keycloak.
