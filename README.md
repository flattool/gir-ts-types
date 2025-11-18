# gir-ts-types | SDK `49`

Up-to-date TypeScript type declarations for use with GNOME JavaScript (GJS) projects.

You are on sdk-v49 branch, which targets SDK version 49.

Using [TS For GIR](https://github.com/gjsify/ts-for-gir), this repository automatically generates TypeScript type declaration files based on GObject Introspection Repository (GIR) files from GNOME's official SDK Flatpak runtime. This ensures that the generated types are as accurate as possible.

Types for different SDK versions are generated in separate branches, so you can safely use this repository as a submodule without worrying about breaking updates.

Only the current SDK version and the one immediately preceding it are updated automatically (because older SDK versions are removed from Flathub). Older versions’ type declarations remain in the repository, they just won’t be updated.
