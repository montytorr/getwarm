# Blocks

##Warm.blocks.FilteredSearch !!$Warm.blocks.FilteredSearch!!

###**Props (optionals)**
####-> customClasses : *String*
> A string containing classes you want to apply (ex : "toto foo bar").
#####Default = *""*

###**Example**
```
var Warm = require('warm-react');

<Warm.blocks.FilteredSearch />
```

##Warm.blocks.FullSearch !!$Warm.blocks.FullSearch!!

###Props (optional)

- customClasses: String

  > A string of classes you want to apply (ex : "toto foo bar").
  > Default is "".

###Example

```
var Warm = require('warm-react');

<Warm.blocks.FullSearch />
```


##Warm.blocks.Login !!$Warm.blocks.Login!!

###Props (optional)
- loginRequestMethod: Function

> A method that this component will call if the form returns no errors. see example for details.
> Default is an empty func.

- boldTitle: String

  > The bold part of the title.
  > Default is "Warm".

- lightTitle: String

  > The light part of the title.
  > Default is "Login".

- description: String

  > Adds a little description underneath the photo.
  > Default is "".

- customClasses: String

  > A string of classes you want to apply (ex : "toto foo bar").
  > Default is "".

###Example

```
var Warm = require('warm-react');

var loginRequestMethod = function(formData, cb){
    userAPI.signIn({
        "emailLogin" : formData.emailLogin.value,
        "passwordLogin" : formData.passwordLogin.value,
        "rememberMeLogin" : formData.rememberMeLogin.value
    }, function(response) {
        if (response.error === null && response.user !== null) {
            UserActions.userVerified();
        } else {
            cb({error: response.error});
        }
    });
};

<Warm.blocks.Login
    loginRequestMethod={loginRequestMethod}
    customClasses="centered"
    boldTitle="Warm"
    lightTitle="login"
    description="Here you can put a little description."/>
```

!!£searchbar!!

##Warm.blocks.SearchBar !!$Warm.blocks.SearchBar!!

###Props (optional)
- content: ReactClass

  > A react class to be displayed before the placeholder.
  > Default is an empty div.

- onSubmit: Function

> A function to be triggered when the field is submitted.
> Default is an empty function.

- placeholder: String

> A string to be displayed as placeholder in the field.
> Default is "".

- customClasses: String

  > A string of classes you want to apply (ex : "toto foo bar")
  > Default is "".

####Example

```
var Warm = require('warm-react');

<Warm.blocks.SearchBar
    customClasses="toto foo bar"/>
```

!!£surface!!

##Warm.blocks.Surface !!$Warm.blocks.Surface!!

###Props (optional)
- title: String

> Set a title to your surface.
> Default is "".

- titleLoading: Boolean

  > If sat to true, replace the title by a loader.
  > Default is false.

- contentLoading: Boolean

> If sat to true, replace the body by a loader.
> Default is false.

- details: ReactClass

> The react class to be displayed on top right of the surface.
> Default is an empty div returned by a ReactClass.

- content: ReactClass

> The react class to be displayed in the surface's body.
> Default is an empty div returned by a ReactClass.

- customClasses: String

  > A string of classes you want to apply (ex : "toto foo bar")
  > Default is "".

####Example

```
var Warm = require('warm-react');

<Warm.blocks.Surface
    title="Hello Warm"
    customClasses="toto foo bar"/>
```
