/* eslint-disable */
var Stream = require("stream")

function toArray(array, end) {
  if (typeof array === "function") {
    end = array
    array = []
  }

  function writeArray(chunk) {
    array.push(chunk)
  }

  function endArray() {
    end(array)
    this.emit("end")
  }
  return WriteStream(writeArray, endArray)
}

function WriteStream(write, end) {
    var stream = new Stream()
        , ended = false

    end = end || defaultEnd

    stream.write = handleWrite
    stream.end = handleEnd

    // Support 0.8 pipe [LEGACY]
    stream.writable = true

    return stream

    function handleWrite(chunk) {
        var result = write.call(stream, chunk)
        return result === false ? false : true
    }

    function handleEnd(chunk) {
        if (ended) {
            return
        }

        ended = true
        if (arguments.length) {
            stream.write(chunk)
        }
        end.call(stream)
    }
}

function defaultEnd() {
    this.emit("finish")
}

WriteStream.toArray = toArray;
module.exports = WriteStream
