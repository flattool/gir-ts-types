/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://GCab?version=1.0' {

// Module dependencies
import type Gio from 'gi://Gio?version=2.0';
import type GObject from 'gi://GObject?version=2.0';
import type GLib from 'gi://GLib?version=2.0';
import type GModule from 'gi://GModule?version=2.0';

export namespace GCab {

    /**
     * GCab-1.0
     */


    /**
     * @gir-type Enum
     */
    export namespace Compression {
        export const $gtype: GObject.GType<Compression>;
    }

    /**
     * Compression used by the {@link GCab.Folder}.
     * @gir-type Enum
     */
    enum Compression {
        /**
         * No compression.
         */
        NONE = 0,
        /**
         * MSZIP compression.
         */
        MSZIP = 1,
        /**
         * QUANTUM compression (unsupported).
         */
        QUANTUM = 2,
        /**
         * LZX compression (only decompression supported).
         */
        LZX = 3,
        /**
         * compression value mask.
         */
        MASK = 15,
    }


    /**
     * The various errors triggered by the GCab functions.
     * @gir-type Struct
     */
    class Error extends GLib.Error {
        static $gtype: GObject.GType<GLib.Error>;

        // Static fields
        /**
         * The given file is not of Cabinet format.
         */
        static FORMAT: number;

        /**
         * General function failure.
         */
        static FAILED: number;

        /**
         * Action or format is not supported
         */
        static NOT_SUPPORTED: number;

        /**
         * Data stream was invalid
         */
        static INVALID_DATA: number;

        // Constructors
        constructor(options: { message: string; code: number });
    }


    function error_quark(): GLib.Quark;

    /**
     * @gir-type Callback
     */
    interface FileCallback {
        (file: File): boolean;
    }

    /**
     * @gir-type Flags
     */
    export namespace FileAttribute {
        export const $gtype: GObject.GType<FileAttribute>;
    }

    /**
     * Attributes associated with the {@link GCab.File}.
     * @gir-type Flags
     */
    enum FileAttribute {
        /**
         * file is read-only
         */
        RDONLY = 1,
        /**
         * file is hidden
         */
        HIDDEN = 2,
        /**
         * file is a system file
         */
        SYSTEM = 4,
        /**
         * file modified since last backup
         */
        ARCH = 32,
        /**
         * run after extraction
         */
        EXEC = 64,
        /**
         * name contains UTF
         */
        NAME_IS_UTF = 128,
    }


    namespace Cabinet {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            "notify::reserved": (pspec: GObject.ParamSpec) => void;
            "notify::signature": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            reserved: Uint8Array | string;
            signature: Uint8Array | string;
        }
    }

    /**
     * An opaque object holding a Cabinet file reference.
     * @gir-type Class
     */
    class Cabinet extends GObject.Object {
        static $gtype: GObject.GType<Cabinet>;

        // Properties
        get reserved(): Uint8Array;
        set reserved(val: Uint8Array | string);

        get signature(): Uint8Array;
        set signature(val: Uint8Array | string);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Cabinet.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Cabinet.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Cabinet;

        // Signals
        /** @signal */
        connect<K extends keyof Cabinet.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Cabinet.SignalSignatures[K]>): number;

        /** @signal */
        connect_after<K extends keyof Cabinet.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Cabinet.SignalSignatures[K]>): number;

        /** @signal */
        emit<K extends keyof Cabinet.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Cabinet.SignalSignatures[K]>): void;

        // Methods
        /**
         * Adds a compression kind to the allow-list. By default, GCab will use all decompression support
         * compiled in at build time. Once this function has been called only specific compression kinds
         * will be used in functions like `gcab_cabinet_load()`.
         * @param compression a {@link GCab.Compression} kind, e.g. {@link GCab.Compression.MSZIP}
         * @since 1.6
         */
        add_allowed_compression(compression: Compression): void;

        /**
         * Add `folder` to `cabinet`.
         * @param folder a {@link GCab.Folder}
         * @returns `true` on success.
         * @throws GLib.Error
         */
        add_folder(folder: Folder): boolean;

        /**
         * Extract files to given path.
         * 
         * If `cabinet` is part of a chained multi-cabinet set, all cabinets in the
         * set are extracted, starting from the first cabinet.
         * 
         * If `path` is NULL then the files are decompressed to memory blobs stored on
         * each {@link GCab.File}.
         * 
         * When extracting to a directory, `path` must be controlled by the caller and
         * must not be writable by untrusted users. Existing path components are
         * checked for symbolic links on a best-effort basis, but this cannot prevent
         * another process from replacing a component after it has been checked. For
         * hostile archives, extract into a private directory or a sandbox.
         * 
         * Extraction is limited to 4 GiB of output and an uncompressed-to-compressed
         * ratio of 1024:1 by default, which prevents decompression bombs. Use
         * `gcab_cabinet_set_extract_size_limit()` and
         * `gcab_cabinet_set_extract_ratio_limit()` to change or disable the limits.
         * @param path the path to extract files
         * @param file_callback an optional {@link GCab.File} callback,     return `false` to filter out or skip files.
         * @param progress_callback a progress callback
         * @param cancellable optional {@link Gio.Cancellable} object,     `null` to ignore
         * @returns `true` on success.
         * @throws GLib.Error
         */
        extract(path: Gio.File | null, file_callback: FileCallback | null, progress_callback: Gio.FileProgressCallback | null, cancellable: Gio.Cancellable | null): boolean;

        /**
         * Extract files to given path.
         * 
         * See `gcab_cabinet_extract()` for the security considerations when extracting
         * to a directory.
         * @param path the path to extract files
         * @param file_callback an optional {@link GCab.File} callback,     return `false` to filter out or skip files.
         * @param cancellable optional {@link Gio.Cancellable} object,     `null` to ignore
         * @returns `true` on success.
         * @throws GLib.Error
         */
        extract_simple(path: Gio.File, file_callback: FileCallback | null, cancellable: Gio.Cancellable | null): boolean;

        /**
         * Get the maximum uncompressed-to-compressed extraction ratio.
         * @returns the ratio limit, or 0 if unlimited
         * @since 1.7
         */
        get_extract_ratio_limit(): number;

        /**
         * Get the maximum number of bytes written during extraction.
         * @returns the limit in bytes, or 0 if unlimited
         * @since 1.7
         */
        get_extract_size_limit(): number;

        /**
         * Get the Cabinet folders within the `cabinet`.
         * Note that Cabinet folders are not like filesystem path, they are
         * group of files sharing some layout parameters.
         * @returns an array of {@link GCab.Folder}
         */
        get_folders(): Folder[];

        /**
         * Get the next cabinet in a multi-cabinet set, or `null` if not set.
         * Use `gcab_cabinet_set_next()` or `gcab_cabinet_load_from_file()` to set up
         * the chain.
         * @returns the next {@link GCab.Cabinet}, or `null`
         * @since 1.7
         */
        get_next(): Cabinet | null;

        /**
         * Get the filename of the next cabinet in a multi-cabinet set, as stored
         * in the cabinet header, or `null` if this is the last cabinet.
         * @returns the next cabinet filename, or `null`
         * @since 1.7
         */
        get_next_name(): string | null;

        /**
         * Get the previous cabinet in a multi-cabinet set, or `null` if not set.
         * Use `gcab_cabinet_set_prev()` or `gcab_cabinet_load_from_file()` to set up
         * the chain.
         * @returns the previous {@link GCab.Cabinet}, or `null`
         * @since 1.7
         */
        get_prev(): Cabinet | null;

        /**
         * Get the filename of the previous cabinet in a multi-cabinet set, as stored
         * in the cabinet header, or `null` if this is the first cabinet.
         * @returns the previous cabinet filename, or `null`
         * @since 1.7
         */
        get_prev_name(): string | null;

        /**
         * Lookup the cabinet authenticode signature if any.
         * @param cancellable optional {@link Gio.Cancellable} object,     `null` to ignore
         * @returns the array containing the PKCS#7 signed data or `null` on error.
         * @since 0.5
         * @throws GLib.Error
         */
        get_signature(cancellable: Gio.Cancellable | null): Uint8Array;

        /**
         * Get the size of the compressed cabinet file.
         * @returns size in bytes
         * @since 1.0
         */
        get_size(): number;

        /**
         * Load a cabinet archive.
         * @param stream a {@link Gio.InputStream}
         * @param cancellable optional {@link Gio.Cancellable} object,     `null` to ignore
         * @returns `true` on success
         * @throws GLib.Error
         */
        load(stream: Gio.InputStream, cancellable: Gio.Cancellable | null): boolean;

        /**
         * Load a cabinet archive from `file`. If the cabinet references
         * adjacent cabinets in a multi-cabinet set, they are automatically
         * loaded and chained from the same directory.
         * @param file a {@link Gio.File} to load
         * @param cancellable optional {@link Gio.Cancellable} object,     `null` to ignore
         * @returns `true` on success
         * @since 1.7
         * @throws GLib.Error
         */
        load_from_file(file: Gio.File, cancellable: Gio.Cancellable | null): boolean;

        /**
         * Set an upper bound on the ratio between bytes written during extraction
         * and the size of the cabinet set.  The default is 1024.  A low ratio
         * catches archives that expand far beyond their on-disk size.  Set `limit`
         * to 0 to disable the ratio limit.
         * @param limit maximum uncompressed-to-compressed ratio, or 0 for no limit
         * @since 1.7
         */
        set_extract_ratio_limit(limit: bigint | number): void;

        /**
         * Set an upper bound on the total number of uncompressed bytes written by
         * `gcab_cabinet_extract()`.  The default is 4 GiB.  This limits decompression
         * bombs and runaway extraction into memory or disk.  Set `limit` to 0 to
         * disable the absolute limit and rely only on the ratio limit.
         * @param limit maximum number of bytes to write while extracting, or 0 for no limit
         * @since 1.7
         */
        set_extract_size_limit(limit: bigint | number): void;

        /**
         * Set the next cabinet in a multi-cabinet set.  When set, extraction
         * of files that span into the next cabinet (CONTINUED_TO_NEXT) will
         * automatically continue reading data from `next`.
         * 
         * The reference is weak: `next` is not kept alive by `cabinet`.
         * @param next the next {@link GCab.Cabinet} in the set, or `null`
         * @since 1.7
         */
        set_next(next: Cabinet | null): void;

        /**
         * Set the previous cabinet in a multi-cabinet set.  When set, extraction
         * of files that span from the previous cabinet (CONTINUED_FROM_PREV)
         * will automatically start reading data from `prev`.
         * 
         * The reference is weak: `prev` is not kept alive by `cabinet`.
         * @param prev the previous {@link GCab.Cabinet} in the set, or `null`
         * @since 1.7
         */
        set_prev(prev: Cabinet | null): void;

        /**
         * Save `cabinet` to the output stream `out`. `out` must be a {@link Gio.Seekable}.
         * @param stream a {@link Gio.OutputStream} also {@link Gio.Seekable}
         * @param file_callback report current file being saved
         * @param progress_callback report saving progress
         * @param cancellable optional {@link Gio.Cancellable} object,     `null` to ignore
         * @returns `true` on success.
         * @throws GLib.Error
         */
        write(stream: Gio.OutputStream, file_callback: FileCallback | null, progress_callback: Gio.FileProgressCallback | null, cancellable: Gio.Cancellable | null): boolean;

        /**
         * Save `cabinet` to the output stream `out`. `out` must be a {@link Gio.Seekable}.
         * @param stream a {@link Gio.OutputStream} also {@link Gio.Seekable}
         * @param file_callback report current file being saved
         * @param cancellable optional {@link Gio.Cancellable} object,     `null` to ignore
         * @returns `true` on success.
         * @throws GLib.Error
         */
        write_simple(stream: Gio.OutputStream, file_callback: FileCallback | null, cancellable: Gio.Cancellable | null): boolean;
    }


    namespace File {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            "notify::bytes": (pspec: GObject.ParamSpec) => void;
            "notify::file": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            bytes: GLib.Bytes | Uint8Array;
            file: Gio.File;
            name: string;
        }
    }

    /**
     * An opaque object, referencing a file in a Cabinet.
     * @gir-type Class
     */
    class File extends GObject.Object {
        static $gtype: GObject.GType<File>;

        // Properties
        get bytes(): GLib.Bytes;
        set bytes(val: GLib.Bytes | Uint8Array);

        get file(): Gio.File;
        set file(val: Gio.File);

        /**
         * @default null
         */
        get name(): string;
        set name(val: string);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: File.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<File.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static new_with_bytes(name: string, bytes: GLib.Bytes | Uint8Array): File;

        static new_with_file(name: string, file: Gio.File): File;

        // Signals
        /** @signal */
        connect<K extends keyof File.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, File.SignalSignatures[K]>): number;

        /** @signal */
        connect_after<K extends keyof File.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, File.SignalSignatures[K]>): number;

        /** @signal */
        emit<K extends keyof File.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<File.SignalSignatures[K]>): void;

        // Methods
        /**
         * Get the file attributes.
         * @returns the cabinet file attributes
         * @since 0.6
         */
        get_attributes(): number;

        /**
         * Get the {@link Gio.File} associated with `file`. This will only be non-`null` if the
         * {@link GCab.File} has been created using `gcab_file_new_with_bytes()`.
         * @returns the associated {@link GLib.Bytes} or `null`
         * @since 1.0
         */
        get_bytes(): GLib.Bytes;

        /**
         * Get the file date, in `result`.
         * @param result a {@link GLib.TimeVal} to return date
         * @returns `true` if `tv` was set
         * @since 0.6
         */
        get_date(result: GLib.TimeVal): boolean;

        /**
         * Gets the file date and returns it as a {@link GLib.DateTime}..
         * @returns file date, or NULL if unknown.
         * @since 1.4
         */
        get_date_time(): GLib.DateTime;

        /**
         * Get the file name to use for extraction, or `null`.
         * @returns a file name
         */
        get_extract_name(): string | null;

        /**
         * If the cabinet is being created, get the {@link Gio.File} associated with
         * `file`. This must be an exisiting file that can be read, in order to
         * be added to the archive during cabinet creation.
         * 
         * If `file` is from an existing cabinet, the fuction will return
         * `null`.
         * @returns the associated {@link Gio.File} or `null`
         */
        get_file(): Gio.File;

        /**
         * Get the file name within the cabinet.
         * @returns the cabinet file name
         */
        get_name(): string;

        /**
         * Get the file size.
         * @returns the cabinet file size
         * @since 0.6
         */
        get_size(): number;

        /**
         * Check whether the file data begins in the previous cabinet of a
         * multi-cabinet set.  If `true`, extracting the file from this cabinet
         * alone will not yield complete data.
         * @returns `true` if the file continues from a previous cabinet
         * @since 1.7
         */
        is_continued_from_prev(): boolean;

        /**
         * Check whether the file data continues into the next cabinet of a
         * multi-cabinet set.  If `true`, extracting the file from this cabinet
         * alone will not yield complete data.
         * @returns `true` if the file continues to a next cabinet
         * @since 1.7
         */
        is_continued_to_next(): boolean;

        /**
         * Set the file attributes.
         * @param attr the attributes, e.g. {@link GCab.FileAttribute.RDONLY}
         * @since 1.0
         */
        set_attributes(attr: number): void;

        /**
         * Replace the {@link GLib.Bytes} associated with `self`.
         * This is most usefule when the {@link GCab.File} has been created using
         * `gcab_file_new_with_bytes()` and the data needs to be modified.
         * @param bytes a {@link GLib.Bytes}, or `null` to clear the data
         * @since 1.5
         */
        set_bytes(bytes: GLib.Bytes | Uint8Array | null): void;

        /**
         * Sets the file modification date, instead of the value provided by the GFile.
         * @param tv a {@link GLib.TimeVal}
         * @since 1.0
         */
        set_date(tv: GLib.TimeVal): void;

        /**
         * Sets the file modification date (instead of the date provided by the GFile)
         * @param dt a {@link GLib.DateTime}
         * @since 1.4
         */
        set_date_time(dt: GLib.DateTime): void;

        /**
         * Sets the file name to use for extraction, instead of the name
         * provided by the Cabinet.
         * @param name a file name or `null`
         */
        set_extract_name(name: string | null): void;
    }


    namespace Folder {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            "notify::compression": (pspec: GObject.ParamSpec) => void;
            "notify::comptype": (pspec: GObject.ParamSpec) => void;
            "notify::reserved": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            compression: Compression;
            comptype: number;
            reserved: Uint8Array | string;
        }
    }

    /**
     * An opaque object, referencing a folder in a Cabinet.
     * @gir-type Class
     */
    class Folder extends GObject.Object {
        static $gtype: GObject.GType<Folder>;

        // Properties
        /**
         * @read-only
         * @default GCab.Compression.NONE
         */
        get compression(): Compression;

        /**
         * @construct-only
         * @default 0
         */
        get comptype(): number;

        get reserved(): Uint8Array;
        set reserved(val: Uint8Array | string);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Folder.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Folder.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](comptype: number): Folder;

        // Signals
        /** @signal */
        connect<K extends keyof Folder.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Folder.SignalSignatures[K]>): number;

        /** @signal */
        connect_after<K extends keyof Folder.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Folder.SignalSignatures[K]>): number;

        /** @signal */
        emit<K extends keyof Folder.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Folder.SignalSignatures[K]>): void;

        // Methods
        /**
         * Add `file` to the {@link GCab.Folder}.
         * @param cabfile file to be added
         * @param recurse whether to recurse through subdirectories
         * @param cancellable optional {@link Gio.Cancellable} object,     `null` to ignore
         * @returns `true` on succes
         * @throws GLib.Error
         */
        add_file(cabfile: File, recurse: boolean, cancellable: Gio.Cancellable | null): boolean;

        /**
         * Returns the compression used in this folder.
         * @returns a {@link GCab.Compression}, e.g. {@link GCab.Compression.MSZIP}
         * @since 1.0
         */
        get_comptype(): number;

        /**
         * Gets a specific {@link GCab.File} files contained in the `cabfolder`.
         * @param name a file name
         * @returns A {@link GCab.File}, or `null` if not found
         */
        get_file_by_name(name: string): File;

        /**
         * Get the list of {@link GCab.File} files contained in the `cabfolder`.
         * @returns list of files
         */
        get_files(): File[];

        /**
         * Get the number of files in this `folder`.
         * @returns a `guint`
         */
        get_nfiles(): number;
    }


    /**
     * @gir-type Alias
     */
    type CabinetClass = typeof Cabinet;

    /**
     * @gir-type Alias
     */
    type FileClass = typeof File;

    /**
     * @gir-type Alias
     */
    type FolderClass = typeof Folder;

    /**
     * Name of the imported GIR library
     * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L188
     */
    const __name__: string;

    /**
     * Version of the imported GIR library
     * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L189
     */
    const __version__: string;
}

export default GCab;

}

declare module 'gi://GCab' {
    import GCab10 from 'gi://GCab?version=1.0';
    export default GCab10;
}
// END
