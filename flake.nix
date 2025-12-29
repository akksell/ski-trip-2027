{
  description = "Development Shell";

  nixConfig = {
    bash-prompt-prefix = "[NIX]";
  };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/871b9fd269ff6246794583ce4ee1031e1da71895";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachSystem flake-utils.lib.defaultSystems (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
          overlays = [];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_24

            git
            curl
          ];
        };
      }
    );
}
