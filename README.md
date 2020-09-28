# PoolTogether Buidler Starter Project

This project is a basic [Buidler](https://buidler.dev/) project that users Ethers.js and includes the PoolTogether contracts.

## Setup

First clone the repository then run:

```bash
$ yarn
```

Copy over .envrc.example to .envrc

```
$ cp .envrc.example .envrc
```

Make sure to update the enviroment variables with suitable values.  You'll want to administer any pools you create, so be sure to use a mnemonic that you used to create a prize pool.

Now enable the env vars using [direnv](https://direnv.net/docs/installation.html)

```
$ direnv allow
```

## Console

Load up the Buidler console.  It will connect to Rinkeby by default:

```bash
$ buidler console
```

Grab the Contract loader helpers:

```js
> const { poolAt, singleRandomWinnerAt, erc20At } = require('./loaders')
```

These helpers will instantiate Ethers.js [Contract](https://docs.ethers.io/v5/api/contract/) objects.

Now let's start talking a pool that was created using the [Prize Pool Builder](https://builder.pooltogether.com):

```js
> pool = await poolAt('0xe6D68A3295Ba8ce28B5F21cBCEc562c804DF6e5F')
```

Let's also connect to its prize strategy:

```js
> prizeStrategy = await singleRandomWinnerAt('0xed7E59eFffF107E0424931D76bE2De6cF42E6F73')
```

If you've configured the mnemonic in the envrc to be the owner of the pool and strategy, you can configure them now!

## External ERC20 Award

The Single Random Winner can award (almost) any tokens held by the Prize Pool to the winner.  Let's award Compound Rinkeby Dai to the winner.

In the Buidler console, add Dai (Compound Rinkeby version) as an external ERC20 award to the strategy:

```js
> await ps.addExternalErc20Award('0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa')
```

Now transfer 50 Dai to the prize pool:

```js
> dai = await erc20At('0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa')
> await dai.transfer(pool.address, ethers.utils.parseEther('50'))
```

Next time the prize strategy awards the prize, it'll also give away 50 dai!

