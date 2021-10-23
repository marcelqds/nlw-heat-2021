# NlwHeatTags

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix


We are almost there! The following steps are missing:

    $ cd nlw_heat_tags

Then configure your database in config/dev.exs and run:

    $ mix ecto.create

Start your Phoenix app with:

    $ mix phx.server

You can also run your app inside IEx (Interactive Elixir) as:

    $ iex -S mix phx.server


## Criando o projeto mix 
```bash
  phx.new nlw_heat_tags --no-html --no-assets  
```

Acesse 
```bash
  
```



## Criando tabela no banco de dados

mix ecto.gen.migration create_messages

Após o comando, será informado o local de criação da migrate, acesse o arquivo e informe os dados abaixo para geração da tabela

```exs
    def change do
      create table(:messages) do
        add :message, :string
        add :username, :string
        add :email, :string

        timestamps()
      end
    end  
```

//Ler do banco de dados todos os emails únicos
//Enviar para todos os emails o report diário de palavras
//Guardar o report no banco de dados
//pesquisar sobre fallback_controller e o utilizá-lo para validação de erros

#semLimites

Após preencimento, rode as migrações

```bash
  mix ecto.migrate
```

```bash
  
```
```bash
  
```
```bash
  
```
```bash
  
```
```bash
  
```
```bash
  
```
```bash
  
```