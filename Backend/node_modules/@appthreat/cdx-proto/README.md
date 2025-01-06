# cdx-proto

Runtime library to serialize/deserialize CycloneDX BOM with protocol buffers. The project was generated using [protoc-gen-es](https://github.com/bufbuild/protobuf-es) from the official [proto](https://github.com/CycloneDX/specification/blob/master/schema/bom-1.5.proto) specification.

## Sample usage

```js
import { Bom } from "@appthreat/cdx-proto";

bomObject
  .fromJsonString(bomJson, {
    ignoreUnknownFields: true,
  })
  .toBinary({ writeUnknownFields: true });

const bomObject = new Bom().fromBinary(readFileSync(binFile), {
  readUnknownFields: true,
});
```

## License

Apache-2.0
