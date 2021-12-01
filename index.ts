class SimpleStuff {
  message: string;
  code: number;
  hasPriority: boolean;
}

const simple1: SimpleStuff = {
  message: "Hello",
  hasPriority: false,
  code: 23,
  // additionalProperty: 123, // error
}

const simple2 = <SimpleStuff> {
  message: "Simple",
  hasPriority: true,
  code: 53,
  additionalProperty: 123, // no error
}

const simple3 = new SimpleStuff();
simple3.message = "New init";
simple3.hasPriority = false;
simple3.code = 65;
// simple3.additionalProperty = 123; // error
simple3['additionalProperty'] = 123;

console.log(`simple1 instanceof SimpleStuff: ${simple1 instanceof SimpleStuff}`)
console.log(`simple2 instanceof SimpleStuff: ${simple2 instanceof SimpleStuff}`)
console.log(`simple3 instanceof SimpleStuff: ${simple3 instanceof SimpleStuff}`)

console.log(simple1)
console.log(simple2)
console.log(simple3)

class SimpleStuffWithPartial {
  constructor(init?: Partial<SimpleStuffWithPartial>) {
    Object.assign(this, init);
  }

  message: string;
  code: number;
  hasPriority: boolean;
}

const simple1WithPartial: SimpleStuffWithPartial = {
  message: "Hello",
  hasPriority: false,
  code: 23,
}

const simple2WithPartial = new SimpleStuffWithPartial({
  message: "Simple",
  hasPriority: true,
  code: 53,
});

const simple3WithPartial = new SimpleStuffWithPartial();
simple3WithPartial.message = "New init for partial";
simple3WithPartial.hasPriority = false;
simple3WithPartial.code = 65;

console.log(`simple1WithPartial instanceof SimpleStuffWithPartial: ${simple1WithPartial instanceof SimpleStuffWithPartial}`)
console.log(`simple2WithPartial instanceof SimpleStuffWithPartial: ${simple2WithPartial instanceof SimpleStuffWithPartial}`)
console.log(`simple3WithPartial instanceof SimpleStuffWithPartial: ${simple3WithPartial instanceof SimpleStuffWithPartial}`)
console.log(`simple3WithPartial instanceof SimpleStuff: ${simple3WithPartial instanceof SimpleStuff}`)

console.log(simple1WithPartial)
console.log(simple2WithPartial)
console.log(simple3WithPartial)

function from<OType>(creator: new() => OType, props?: OType): OType {
  const t = new creator();

  Object.assign(t, props ?? {});

  return t;
}

const simpleFromFunction = from(SimpleStuff, {
  message: "Simple from helper function",
  hasPriority: true,
  code: 53,
  // additionalProperty: 123, // error
});

// simpleFromFunction.additionalProperty = 123; // error
// Dynamic assignment
simpleFromFunction['additionalProperty'] = 123;

console.log(`simpleFromFunction instanceof SimpleStuff: ${simpleFromFunction instanceof SimpleStuff}`)

console.log(simpleFromFunction)