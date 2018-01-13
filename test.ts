// greeter.ts
class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

var hero = new Greeter("Mike") ;

console.log(hero.greet())
