## My *WIP* Project to create CRUD Base Application *Framework*

1. it based on https://github.com/gothinkster/angular-realworld-example-app
2. Will implement 12 Factor of application https://12factor.net/
3. The logic actually same with https://github.com/novanxyz/vardion_catalog, but using angular, for easy portability to go android apps.


###  Planned features


1. Basic CRUD Operations ( for each model )

* there will be two page each model, list page and detail page (obvious)
* card-base listing for list page (repeately render model card)
* form-base details for details page ( go on readonly/view and input/edit mode respectfully)

2. Login Detection ( as vardion_catalog ).
3. Server Settings (lang, currency, name-value pairs for selections) pre-reloads ( as vardion_catalog ).
4. Custom shared components
  * Paginator
  * Calendar View
  * Dynamic Menu Renderer
  * etc..

5. Schematics Template, generated complete module  **structure** from a model.
  * You needed to define model class file in root folder.
  * Generate model modules by execute an command with model class file as input.
  * Fix/Modify templates view (especially card and form view) on the .html files.
  * Add action logics on the .ts files.
  

You'll see the progress on commit messages.



