This short script uses two APIs to find out the estimated age and gender of a user, given their name. It was created for May 30th reinforcement session at Ironhack webdev bootcamp. The purpose is to review fetch syntax, API use and most importantly the use of then/catch and async/await.

<br>

# Asynchronicity

The functions `getInfoWithThenNesting`, `getInfoWithThenChaining` and `getInfoWithAsyncAwait` do the exact same thing: they make two successive API calls to get the estimated age and gender associated to the name, then display a sentence containing both.

To test each function, you can simply change the `addEventListener` at line 75.

We need to control that the displaying doesn't happen before we actually get the info.

## Nesting then/catch

In the first function, our strategy is to nest several `.then`, meaning that each one is inside the previous. This allows us to make sure that each step happens after the one containing it.

## Chaining then/catch

A more readable way of doing the same thing is to chain the `.then`: having them one after the other instead of one inside the other.

However, if we do this, we need to remember to **return a promise** from the callback of each `.then`, because a `.then` can only be applied to a Promise.

The result of a fulfilled Promise will be available as the parameter of the next then's callback.

## Async/await

This syntax allows us to further simplify our code. The whole function needs to be prefixed with the keyword `async`. Every time we perform an asynchronous operation and we need to **wait** for a Promise to be fulfilled, we can just write `await`before and store the result in a variable.

Whatever code is on the following lines will not be executed until the promise is fulfilled. The `try/catch` handles the cases where one of these promises is rejected.

## Promise.all

We could also use `Promise.all`, which allows us to take care of an array of promises in parallel, transforming them into a single promise. We don't really care whether we get the age or the gender first, as long as we get both before we display the sentence.

<br>

# Fetch and APIs

The external APIs used are very straightforward. This is not always the case! In your projects, always check the documentation and actually try to get the API to work before you commit to its use.

Despite `fetch`, you can also use axios, which is not native JS but is slightly simpler in its use because it handles the `.json()` step for you.
